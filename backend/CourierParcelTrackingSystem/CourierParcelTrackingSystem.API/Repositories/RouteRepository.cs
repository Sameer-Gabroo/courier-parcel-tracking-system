using CourierParcelTrackingSystem.API.Data;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using RouteEntity = CourierParcelTrackingSystem.API.Entities.Route;

namespace CourierParcelTrackingSystem.API.Repositories
{
    public class RouteRepository : IRouteRepository
    {
        private readonly ApplicationDbContext _context;

        public RouteRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<RouteEntity>> GetRoutesAsync(int page, int pageSize,  string? search)
        {
            var query = _context.Routes
                .Include(r => r.OriginHub)
                .Include(r => r.DestinationHub)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(r =>
                    r.RouteCode.Contains(search) ||
                    r.OriginHub.HubName.Contains(search) ||
                    r.DestinationHub.HubName.Contains(search)
                );
            }

            return await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<RouteEntity?> GetRouteByIdAsync(int routeId)
        {
            return await _context.Routes
                .Include(r => r.OriginHub)
                .Include(r => r.DestinationHub)
                .FirstOrDefaultAsync(r => r.RouteId == routeId);
        }

        public async Task AddRouteAsync(RouteEntity route)
        {
            await _context.Routes.AddAsync(route);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRouteAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRouteAsync(RouteEntity route)
        {
            _context.Routes.Remove(route);
            await _context.SaveChangesAsync();
        }
    }
}