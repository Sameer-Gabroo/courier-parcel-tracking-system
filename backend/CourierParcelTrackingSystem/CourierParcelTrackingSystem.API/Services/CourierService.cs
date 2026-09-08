using CourierParcelTrackingSystem.API.Constants;
using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.Entities;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using CourierParcelTrackingSystem.API.Services.Interfaces;

namespace CourierParcelTrackingSystem.API.Services
{
    public class CourierService : ICourierService
    {
        private readonly ICourierRepository _courierRepository;

        public CourierService(ICourierRepository courierRepository)
        {
            _courierRepository = courierRepository;
        }

        public async Task<List<CourierResponseDto>> GetCouriersAsync(
            int page,
            int pageSize,
            string? search)
        {
            try
            {
                var couriers = await _courierRepository
                    .GetCouriersAsync(page, pageSize, search);

                return couriers
                    .Select(MapToCourierResponse)
                    .ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(
                    ErrorMessages.GetCouriersFailed,
                    ex);
            }
        }

        public async Task<CourierResponseDto?> GetCourierByIdAsync(
          int courierId,
          int? loggedInCourierId,
          string? role)
            {
            if (role == "Courier" && loggedInCourierId != courierId)
            {
                return null;
            }

            var courier = await _courierRepository
                .GetCourierByIdAsync(courierId);

            if (courier == null)
            {
                return null;
            }

            return MapToCourierResponse(courier);
        }

        public async Task<List<CourierResponseDto>> GetAvailableCouriersForParcelAsync(
            int parcelId)
                {
                    try
                    {
                        var couriers = await _courierRepository
                            .GetAvailableCouriersForParcelAsync(parcelId);

                        return couriers
                            .Select(MapToCourierResponse)
                            .ToList();
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(
                            ErrorMessages.GetCouriersFailed,
                            ex);
                    }
                }

        public async Task<CourierResponseDto> AddCourierAsync(
            CreateCourierRequestDto createCourierRequest)
        {
            try
            {
                var count = await _courierRepository.GetCourierCountAsync();
                var courier = new Courier
                {
                    CourierCode = GenerateCourierCode(count),
                    CourierName = createCourierRequest.CourierName,
                    Email = createCourierRequest.Email,
                    City = createCourierRequest.City,
                    IsActive = createCourierRequest.IsActive,
                    CreatedAt = DateTime.UtcNow,

                    CourierDetail = new CourierDetail
                    {
                        Phone = createCourierRequest.Phone,
                        Address = createCourierRequest.Address,
                        EmergencyContact =
                            createCourierRequest.EmergencyContact,
                        EmergencyPhone =
                            createCourierRequest.EmergencyPhone,
                        CreatedAt = DateTime.UtcNow
                    }
                };

                await _courierRepository.AddCourierAsync(courier);

                return MapToCourierResponse(courier);
            }
            catch (Exception ex)
            {
                throw new Exception(
                    ErrorMessages.CreateCourierFailed,
                    ex);
            }
        }

        public async Task<CourierResponseDto?> UpdateCourierAsync(
            int courierId,
            UpdateCourierRequestDto updateCourierRequest)
        {
            try
            {
                var courier = await _courierRepository
                    .GetCourierByIdAsync(courierId);

                if (courier == null)
                {
                    return null;
                }

                courier.CourierCode =
                    updateCourierRequest.CourierCode;

                courier.CourierName =
                    updateCourierRequest.CourierName;

                courier.Email =
                    updateCourierRequest.Email;

                courier.City =
                    updateCourierRequest.City;

                courier.IsActive =
                    updateCourierRequest.IsActive;

                if (courier.CourierDetail != null)
                {
                    courier.CourierDetail.Phone =
                        updateCourierRequest.Phone;

                    courier.CourierDetail.Address =
                        updateCourierRequest.Address;

                    courier.CourierDetail.EmergencyContact =
                        updateCourierRequest.EmergencyContact;

                    courier.CourierDetail.EmergencyPhone =
                        updateCourierRequest.EmergencyPhone;

                    courier.CourierDetail.UpdatedAt =
                        DateTime.UtcNow;
                }

                courier.UpdatedAt = DateTime.UtcNow;

                await _courierRepository.UpdateCourierAsync();

                return MapToCourierResponse(courier);
            }
            catch (Exception ex)
            {
                throw new Exception(
                    ErrorMessages.UpdateCourierFailed,
                    ex);
            }
        }

        public async Task<bool> DeleteCourierAsync(int courierId)
        {
            try
            {
                var courier = await _courierRepository
                    .GetCourierByIdAsync(courierId);

                if (courier == null)
                {
                    return false;
                }

                await _courierRepository.DeleteCourierAsync(courier);

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(
                    ErrorMessages.DeleteCourierFailed,
                    ex);
            }
        }

        internal static string GenerateCourierCode(int courierCount)
        {
            return $"COU{courierCount + 1:D3}";
        }

        // Reusable private method
        private CourierResponseDto MapToCourierResponse(
            Courier courier)
        {
            return new CourierResponseDto
            {
                CourierId = courier.CourierId,
                CourierCode = courier.CourierCode,
                CourierName = courier.CourierName,
                Email = courier.Email,
                City = courier.City,

                Phone = courier.CourierDetail?.Phone,
                Address = courier.CourierDetail?.Address,

                EmergencyContact =
                    courier.CourierDetail?.EmergencyContact,

                EmergencyPhone =
                    courier.CourierDetail?.EmergencyPhone,

                IsActive = courier.IsActive
            };
        }
    }
}
