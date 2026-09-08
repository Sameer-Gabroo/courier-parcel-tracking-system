using CourierParcelTrackingSystem.API.DTOs;

namespace CourierParcelTrackingSystem.API.Services.Interfaces
{
    public interface IRouteService
    {
        Task<List<RouteResponseDto>> GetRoutesAsync(
            int page,
            int pageSize,
            string? search
        );

        Task<RouteResponseDto?> GetRouteByIdAsync(int routeId);

        Task<RouteResponseDto> AddRouteAsync(
            CreateRouteRequestDto createRouteRequest
        );

        Task<RouteResponseDto?> UpdateRouteAsync(
            int routeId,
            UpdateRouteRequestDto updateRouteRequest
        );

        Task<bool> DeleteRouteAsync(int routeId);
    }
}