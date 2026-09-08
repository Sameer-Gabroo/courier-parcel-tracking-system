using RouteEntity = CourierParcelTrackingSystem.API.Entities.Route;

namespace CourierParcelTrackingSystem.API.Repositories.Interfaces
{
    public interface IRouteRepository
    {
        Task<List<RouteEntity>> GetRoutesAsync(
            int page,
            int pageSize,
            string? search
        );

        Task<RouteEntity?> GetRouteByIdAsync(int routeId);

        Task AddRouteAsync(RouteEntity route);

        Task UpdateRouteAsync();

        Task DeleteRouteAsync(RouteEntity route);
    }
}