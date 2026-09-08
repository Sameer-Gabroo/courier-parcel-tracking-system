using CourierParcelTrackingSystem.API.Data;
using CourierParcelTrackingSystem.API.Entities;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CourierParcelTrackingSystem.API.Repositories
{
    public class HubRepository : IHubRepository
    {
        private readonly ApplicationDbContext _context;

        public HubRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Hub>> GetHubsAsync(int page,int pageSize,string? search)
        {
            var query = _context.Hubs
            .Where(h => !h.IsDeleted)
            .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(h =>
                    h.HubCode.Contains(search) ||
                    h.HubName.Contains(search) ||
                    h.City.Contains(search)
                );
            }

            return await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<Hub?> GetHubByIdAsync(int hubId)
        {
            return await _context.Hubs
                .FirstOrDefaultAsync(h => h.HubId == hubId);
        }

        public async Task AddHubAsync(Hub hub)
        {
            await _context.Hubs.AddAsync(hub);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateHubAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task DeleteHubAsync(Hub hub)
        {
            hub.IsDeleted = true;

            await _context.SaveChangesAsync();
        }
    }
}