using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.Entities;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using CourierParcelTrackingSystem.API.Services.Interfaces;

namespace CourierParcelTrackingSystem.API.Services
{
    public class ParcelService : IParcelService
    {
        private readonly IParcelRepository _parcelRepository;
        private readonly ICourierRepository _courierRepository;
        private readonly IRouteRepository _routeRepository;

        public ParcelService(
            IParcelRepository parcelRepository,
            ICourierRepository courierRepository,
            IRouteRepository routeRepository)
        {
            _parcelRepository = parcelRepository;
            _courierRepository = courierRepository;
            _routeRepository = routeRepository;
        }

        private string GenerateTrackingNumber()
        {
            return $"TRK-{DateTime.UtcNow:yyyyMMddHHmmss}";
        }

        public async Task<PagedParcelResponseDto> GetParcelsAsync(int page, int pageSize,  string? search,  string? status)
        {
            var parcels = await _parcelRepository
                .GetParcelsAsync( page,  pageSize,  search,  status);

            var totalCount = await _parcelRepository
                .GetParcelCountAsync(search, status);

            var totalPages = (int)Math.Ceiling(
                totalCount / (double)pageSize
            );

            return new PagedParcelResponseDto
            {
                Parcels = parcels.Select(MapToParcelResponse) .ToList(),

                TotalCount = totalCount,

                Page = page,

                PageSize = pageSize,

                TotalPages = totalPages
            };
        }

        public async Task<List<ParcelResponseDto>> GetCustomerParcelsAsync(int customerId)
        {
            var parcels = await _parcelRepository
                .GetCustomerParcelsAsync(customerId);

            return parcels
                .Select(MapToParcelResponse)
                .ToList();
        }

        public async Task<ParcelResponseDto?> GetParcelByIdAsync(int parcelId)
        {
            var parcel = await _parcelRepository.GetParcelByIdAsync(parcelId);
            return parcel == null ? null : MapToParcelResponse(parcel);
        }

        public async Task<ParcelResponseDto> AddParcelAsync(CreateParcelRequestDto createParcelRequest)
        {
            var parcel = new Parcel
            {
                TrackingNumber = GenerateTrackingNumber(),
                CustomerId = createParcelRequest.CustomerId,
                CourierId = null,
                RouteId = createParcelRequest.RouteId,
                CurrentStatus = "Pending",
                BookedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false,
                ParcelRecipient = new ParcelRecipient
                {
                    ReceiverName = createParcelRequest.ParcelRecipient.ReceiverName,
                    ReceiverPhone = createParcelRequest.ParcelRecipient.ReceiverPhone,
                    ReceiverAddress = createParcelRequest.ParcelRecipient.ReceiverAddress,
                    CreatedAt = DateTime.UtcNow
                },
                ParcelDetails = createParcelRequest.ParcelDetails.Select(detail => new ParcelDetail
                {
                    ItemName = detail.ItemName,
                    Description = detail.Description,
                    Quantity = detail.Quantity,
                    WeightKg = detail.WeightKg,
                    CreatedAt = DateTime.UtcNow
                }).ToList(),
                StatusEvents = new List<StatusEvent>
                {
                    new StatusEvent
                    {
                        Status = "Pending",
                        EventTime = DateTime.UtcNow,
                        CreatedAt = DateTime.UtcNow,
                        IsActive = true,
                        IsDeleted = false,
                        Remarks = "Parcel created."
                    }
                }
            };

            await _parcelRepository.AddParcelAsync(parcel);

            var savedParcel = await _parcelRepository.GetParcelByIdAsync(parcel.ParcelId);
            return MapToParcelResponse(savedParcel!);
        }

        
        
        public async Task<ParcelResponseDto?> UpdateParcelAsync(
         int parcelId,
         UpdateParcelRequestDto updateParcelRequest)
        {
            var parcel = await _parcelRepository.GetParcelForUpdateAsync(parcelId);

            if (parcel == null)
            {
                return null;
            }

            parcel.CustomerId = updateParcelRequest.CustomerId;
            parcel.RouteId = updateParcelRequest.RouteId;

            var parcelDetail = parcel.ParcelDetails.FirstOrDefault();
            var requestDetail = updateParcelRequest.ParcelDetail;

            if (parcelDetail != null)
            {
                parcelDetail.ItemName = requestDetail.ItemName;
                parcelDetail.Description = requestDetail.Description;
                parcelDetail.Quantity = requestDetail.Quantity;
                parcelDetail.WeightKg = requestDetail.WeightKg;
            }

            var parcelRecipient = parcel.ParcelRecipient;
            var requestRecipient = updateParcelRequest.ParcelRecipient;

            if (parcelRecipient != null)
            {
                parcelRecipient.ReceiverName = requestRecipient.ReceiverName;
                parcelRecipient.ReceiverPhone = requestRecipient.ReceiverPhone;
                parcelRecipient.ReceiverAddress = requestRecipient.ReceiverAddress;
            }

            parcel.UpdatedAt = DateTime.UtcNow;

            await _parcelRepository.UpdateParcelAsync();

            var updatedParcel = await _parcelRepository.GetParcelByIdAsync(parcelId);

            return MapToParcelResponse(updatedParcel!);
        }

        public async Task<bool> DeleteParcelAsync(int parcelId)
        {
            var parcel = await _parcelRepository.GetParcelForDeleteAsync(parcelId);

            if (parcel == null)
            {
                return false;
            }

            await _parcelRepository.DeleteParcelAsync(parcel);
            return true;
        }

        public async Task<ParcelResponseDto?> GetParcelByTrackingNumberAsync(string trackingNumber)
        {
            var parcel = await _parcelRepository.GetParcelByTrackingNumberAsync(trackingNumber);
            return parcel == null ? null : MapToParcelResponse(parcel);
        }

        public async Task<List<ParcelResponseDto>> GetPendingParcelsAsync()
        {
            var parcels = await _parcelRepository.GetPendingParcelsAsync();
            return parcels.Select(MapToParcelResponse).ToList();
        }

        public async Task<ParcelResponseDto?> AssignParcelAsync(int parcelId, AssignParcelRequestDto assignParcelRequest)
        {
            var parcel = await _parcelRepository
                .GetParcelForAssignmentAsync(parcelId);

            if (parcel == null || parcel.CurrentStatus != "Pending")
            {
                return null;
            }

            var availableCouriers = await _courierRepository
                .GetAvailableCouriersForParcelAsync(parcelId);

            var courier = availableCouriers
                .FirstOrDefault(c =>
                    c.CourierId == assignParcelRequest.CourierId);

            if (courier == null)
            {
                return null;
            }

            var route = parcel.Route;

            if (route == null)
            {
                return null;
            }

            parcel.CourierId = courier.CourierId;
            parcel.CurrentStatus = "Assigned";

            parcel.ExpectedDeliveryDate = route.EstimatedHours.HasValue
                ? DateTime.UtcNow.AddHours(
                    (double)route.EstimatedHours.Value)
                : null;

            parcel.UpdatedAt = DateTime.UtcNow;

            parcel.StatusEvents.Add(new StatusEvent
            {
                CourierId = courier.CourierId,
                HubId = route.OriginHubId,
                Status = "Assigned",
                EventTime = DateTime.UtcNow,
                Remarks = assignParcelRequest.Remarks,
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false
            });

            await _parcelRepository.UpdateParcelAsync();

            var assignedParcel =
                await _parcelRepository.GetParcelByIdAsync(parcelId);

            return MapToParcelResponse(assignedParcel!);
        }

        public async Task<List<ParcelResponseDto>> GetCourierAssignedParcelsAsync(int courierId)
        {
            var parcels = await _parcelRepository.GetCourierAssignedParcelsAsync(courierId);
            return parcels.Select(MapToParcelResponse).ToList();
        }

        public async Task<ParcelResponseDto?> UpdateCourierParcelStatusAsync(
    int parcelId,
    int courierId,
    UpdateCourierParcelStatusRequestDto updateStatusRequest)
        {
            var parcel = await _parcelRepository
                .GetParcelForCourierStatusAsync(parcelId);

            // Make sure the parcel exists
            // and belongs to the logged-in courier
            if (parcel == null || parcel.CourierId != courierId)
            {
                return null;
            }

            var nextStatus = parcel.CurrentStatus switch
            {
                "Assigned" => "Picked Up",
                "Picked Up" => "In Transit",
                "In Transit" => "Out for Delivery",
                "Out for Delivery" => "Delivered",
                _ => null
            };

            // Make sure courier is following the correct status sequence
            if (nextStatus != updateStatusRequest.Status)
            {
                return null;
            }

            parcel.CurrentStatus = updateStatusRequest.Status;
            parcel.UpdatedAt = DateTime.UtcNow;

            if (updateStatusRequest.Status == "Delivered")
            {
                parcel.ActualDeliveryDate = DateTime.UtcNow;
            }

            parcel.StatusEvents.Add(new StatusEvent
            {
                CourierId = courierId,
                HubId = updateStatusRequest.HubId,
                Status = updateStatusRequest.Status,
                EventTime = DateTime.UtcNow,
                Remarks = updateStatusRequest.Remarks,
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false
            });

            await _parcelRepository.UpdateParcelAsync();

            var updatedParcel = await _parcelRepository
                .GetParcelByIdAsync(parcelId);

            return MapToParcelResponse(updatedParcel!);
        }

        private ParcelResponseDto MapToParcelResponse(Parcel parcel)
        {
            return new ParcelResponseDto
            {
                ParcelId = parcel.ParcelId,
                TrackingNumber = parcel.TrackingNumber,
                CustomerId = parcel.CustomerId,
                CustomerName = parcel.Customer?.CustomerName ?? "",
                CustomerEmail = parcel.Customer?.Email ?? "",
                CustomerPhone = parcel.Customer?.CustomerDetail?.Phone,
                CustomerAddress = parcel.Customer?.CustomerDetail?.Address,
                CustomerCity = parcel.Customer?.CustomerDetail?.City,
                CourierId = parcel.CourierId,
                CourierName = parcel.Courier?.CourierName,
                RouteId = parcel.RouteId,
                RouteCode = parcel.Route?.RouteCode,
                OriginHubName = parcel.Route?.OriginHub?.HubName,
                DestinationHubName = parcel.Route?.DestinationHub?.HubName,
                CurrentStatus = parcel.CurrentStatus,
                BookedAt = parcel.BookedAt,
                ExpectedDeliveryDate = parcel.ExpectedDeliveryDate,
                ActualDeliveryDate = parcel.ActualDeliveryDate,
                IsActive = parcel.IsActive,
                ParcelDetails = parcel.ParcelDetails.Select(detail => new ParcelDetailResponseDto
                {
                    ParcelDetailId = detail.ParcelDetailId,
                    ItemName = detail.ItemName,
                    Description = detail.Description,
                    Quantity = detail.Quantity,
                    WeightKg = detail.WeightKg
                }).ToList(),
                ParcelRecipient = parcel.ParcelRecipient == null ? null : new ParcelRecipientResponseDto
                {
                    ParcelRecipientId = parcel.ParcelRecipient.ParcelRecipientId,
                    ReceiverName = parcel.ParcelRecipient.ReceiverName,
                    ReceiverPhone = parcel.ParcelRecipient.ReceiverPhone,
                    ReceiverAddress = parcel.ParcelRecipient.ReceiverAddress
                },
                StatusEvents = parcel.StatusEvents.OrderBy(se => se.EventTime).Select(statusEvent => new StatusEventResponseDto
                {
                    StatusEventId = statusEvent.StatusEventId,
                    HubId = statusEvent.HubId,
                    HubName = statusEvent.Hub?.HubName,
                    CourierId = statusEvent.CourierId,
                    CourierName = statusEvent.Courier?.CourierName,
                    Status = statusEvent.Status,
                    EventTime = statusEvent.EventTime,
                    Remarks = statusEvent.Remarks
                }).ToList()
            };
        }
    }
}
