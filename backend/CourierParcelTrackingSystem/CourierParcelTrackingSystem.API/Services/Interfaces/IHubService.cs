using CourierParcelTrackingSystem.API.DTOs;

namespace CourierParcelTrackingSystem.API.Services.Interfaces
{
    public interface IHubService
    {
        Task<List<HubResponseDto>> GetHubsAsync( int page,int pageSize,  string? search
        );

        Task<HubResponseDto?> GetHubByIdAsync(int hubId);

        Task<HubResponseDto> AddHubAsync( CreateHubRequestDto createHubRequest);

        Task<HubResponseDto?> UpdateHubAsync(int hubId,UpdateHubRequestDto updateHubRequest );

        Task<bool> DeleteHubAsync(int hubId);
    }
}