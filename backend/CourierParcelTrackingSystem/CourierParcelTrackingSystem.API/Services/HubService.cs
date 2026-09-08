using CourierParcelTrackingSystem.API.Constants;
using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.Entities;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using CourierParcelTrackingSystem.API.Services.Interfaces;

namespace CourierParcelTrackingSystem.API.Services
{
    public class HubService : IHubService
    {
        private readonly IHubRepository _hubRepository;

        public HubService(IHubRepository hubRepository)
        {
            _hubRepository = hubRepository;
        }

        public async Task<List<HubResponseDto>> GetHubsAsync(
            int page,
            int pageSize,
            string? search)
        {
            try
            {
                var hubs = await _hubRepository
                    .GetHubsAsync(page, pageSize, search);

                return hubs
                    .Select(MapToHubResponse)
                    .ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ErrorMessages.GetHubsFailed, ex);
            }
        }

        public async Task<HubResponseDto?> GetHubByIdAsync(int hubId)
        {
            try
            {
                var hub = await _hubRepository
                    .GetHubByIdAsync(hubId);

                if (hub == null)
                {
                    return null;
                }

                return MapToHubResponse(hub);
            }
            catch (Exception ex)
            {
                throw new Exception(ErrorMessages.GetHubByIdFailed, ex);
            }
        }

        public async Task<HubResponseDto> AddHubAsync(
            CreateHubRequestDto createHubRequest)
        {
            try
            {
                var hub = new Hub
                {
                    HubCode = $"HUB-{Guid.NewGuid().ToString().Substring(0, 6).ToUpper()}",
                    HubName = createHubRequest.HubName,
                    City = createHubRequest.City,
                    Address = createHubRequest.Address,
                    Phone = createHubRequest.Phone,
                    IsActive = createHubRequest.IsActive,
                    CreatedAt = DateTime.UtcNow
                };

                await _hubRepository.AddHubAsync(hub);

                return MapToHubResponse(hub);
            }
            catch (Exception ex)
            {
                throw new Exception(ErrorMessages.CreateHubFailed, ex);
            }
        }

        public async Task<HubResponseDto?> UpdateHubAsync(
            int hubId,
            UpdateHubRequestDto updateHubRequest)
        {
            try
            {
                var hub = await _hubRepository
                    .GetHubByIdAsync(hubId);

                if (hub == null)
                {
                    return null;
                }

                //hub.HubCode = updateHubRequest.HubCode;
                hub.HubName = updateHubRequest.HubName;
                hub.City = updateHubRequest.City;
                hub.Address = updateHubRequest.Address;
                hub.Phone = updateHubRequest.Phone;
                hub.IsActive = updateHubRequest.IsActive;
                hub.UpdatedAt = DateTime.UtcNow;

                await _hubRepository.UpdateHubAsync();

                return MapToHubResponse(hub);
            }
            catch (Exception ex)
            {
                throw new Exception(ErrorMessages.UpdateHubFailed, ex);
            }
        }

        public async Task<bool> DeleteHubAsync(int hubId)
        {
            try
            {
                var hub = await _hubRepository
                    .GetHubByIdAsync(hubId);

                if (hub == null)
                {
                    return false;
                }

                await _hubRepository.DeleteHubAsync(hub);

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private HubResponseDto MapToHubResponse(Hub hub)
        {
            return new HubResponseDto
            {
                HubId = hub.HubId,
                HubCode = hub.HubCode,
                HubName = hub.HubName,
                City = hub.City,
                Address = hub.Address,
                Phone = hub.Phone,
                IsActive = hub.IsActive
            };
        }
    }
}