using CourierParcelTrackingSystem.API.Constants;
using CourierParcelTrackingSystem.API.DTOs;
using RouteEntity = CourierParcelTrackingSystem.API.Entities.Route;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using CourierParcelTrackingSystem.API.Services.Interfaces;

namespace CourierParcelTrackingSystem.API.Services
{
    public class RouteService : IRouteService
    {
        private readonly IRouteRepository _routeRepository;

        public RouteService(IRouteRepository routeRepository)
        {
            _routeRepository = routeRepository;
        }

        public async Task<List<RouteResponseDto>> GetRoutesAsync(int page,int pageSize, string? search)
        {
            try
            {
                var routes = await _routeRepository.GetRoutesAsync(page, pageSize, search);

                return routes.Select(route => new RouteResponseDto
                {
                    RouteId = route.RouteId,
                    RouteCode = route.RouteCode,

                    OriginHubId = route.OriginHubId,
                    OriginHubName = route.OriginHub.HubName,

                    DestinationHubId = route.DestinationHubId,
                    DestinationHubName = route.DestinationHub.HubName,

                    DistanceKm = route.DistanceKm,
                    EstimatedHours = route.EstimatedHours,
                    IsActive = route.IsActive
                }).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ErrorMessages.GetRoutesFailed, ex);
            }
        }

        public async Task<RouteResponseDto?> GetRouteByIdAsync(int routeId)
        {
            try
            {
                var route = await _routeRepository.GetRouteByIdAsync(routeId);

                if (route == null)
                {
                    return null;
                }

                return new RouteResponseDto
                {
                    RouteId = route.RouteId,
                    RouteCode = route.RouteCode,

                    OriginHubId = route.OriginHubId,
                    OriginHubName = route.OriginHub.HubName,

                    DestinationHubId = route.DestinationHubId,
                    DestinationHubName = route.DestinationHub.HubName,

                    DistanceKm = route.DistanceKm,
                    EstimatedHours = route.EstimatedHours,
                    IsActive = route.IsActive
                };
            }
            catch (Exception ex)
            {
                throw new Exception( ErrorMessages.GetRouteByIdFailed, ex );
            }
        }

        public async Task<RouteResponseDto> AddRouteAsync(CreateRouteRequestDto createRouteRequest)
        {
            try
            {
                var route = new RouteEntity
                {
                    RouteCode = createRouteRequest.RouteCode,
                    OriginHubId = createRouteRequest.OriginHubId,
                    DestinationHubId = createRouteRequest.DestinationHubId,
                    DistanceKm = createRouteRequest.DistanceKm,
                    EstimatedHours = createRouteRequest.EstimatedHours,
                    IsActive = createRouteRequest.IsActive,
                    CreatedAt = DateTime.UtcNow
                };

                await _routeRepository.AddRouteAsync(route);

                var savedRoute = await _routeRepository.GetRouteByIdAsync(route.RouteId);

                return new RouteResponseDto
                {
                    RouteId = savedRoute!.RouteId,
                    RouteCode = savedRoute.RouteCode,

                    OriginHubId = savedRoute.OriginHubId,
                    OriginHubName = savedRoute.OriginHub.HubName,

                    DestinationHubId = savedRoute.DestinationHubId,
                    DestinationHubName = savedRoute.DestinationHub.HubName,

                    DistanceKm = savedRoute.DistanceKm,
                    EstimatedHours = savedRoute.EstimatedHours,
                    IsActive = savedRoute.IsActive
                };
            }
            catch (Exception ex)
            {
                throw new Exception(ErrorMessages.CreateRouteFailed, ex );
            }
        }

        public async Task<RouteResponseDto?> UpdateRouteAsync(int routeId,UpdateRouteRequestDto updateRouteRequest)
        {
            try
            {
                var route = await _routeRepository .GetRouteByIdAsync(routeId);

                if (route == null)
                {
                    return null;
                }

                route.RouteCode = updateRouteRequest.RouteCode;
                route.OriginHubId = updateRouteRequest.OriginHubId;
                route.DestinationHubId = updateRouteRequest.DestinationHubId;
                route.DistanceKm = updateRouteRequest.DistanceKm;
                route.EstimatedHours = updateRouteRequest.EstimatedHours;
                route.IsActive = updateRouteRequest.IsActive;
                route.UpdatedAt = DateTime.UtcNow;

                await _routeRepository.UpdateRouteAsync();

                var updatedRoute = await _routeRepository .GetRouteByIdAsync(routeId);

                return new RouteResponseDto
                {
                    RouteId = updatedRoute!.RouteId,
                    RouteCode = updatedRoute.RouteCode,

                    OriginHubId = updatedRoute.OriginHubId,
                    OriginHubName = updatedRoute.OriginHub.HubName,

                    DestinationHubId = updatedRoute.DestinationHubId,
                    DestinationHubName = updatedRoute.DestinationHub.HubName,

                    DistanceKm = updatedRoute.DistanceKm,
                    EstimatedHours = updatedRoute.EstimatedHours,
                    IsActive = updatedRoute.IsActive
                };
            }
            catch (Exception ex)
            {
                throw new Exception( ErrorMessages.UpdateRouteFailed, ex );
            }
        }

        public async Task<bool> DeleteRouteAsync(int routeId)
        {
            try
            {
                var route = await _routeRepository.GetRouteByIdAsync(routeId);

                if (route == null)
                {
                    return false;
                }

                await _routeRepository.DeleteRouteAsync(route);

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception( ErrorMessages.DeleteRouteFailed,ex );
            }
        }
    }
}