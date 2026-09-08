using CourierParcelTrackingSystem.API.Data;
using CourierParcelTrackingSystem.API.Entities;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CourierParcelTrackingSystem.API.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly ApplicationDbContext _context;

        public DashboardRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetTotalParcelsAsync()
        {
            return await _context.Parcels
                .CountAsync(p => !p.IsDeleted);
        }

        public async Task<int> GetInTransitParcelsAsync()
        {
            return await _context.Parcels
                .CountAsync(p =>
                    !p.IsDeleted &&
                    p.CurrentStatus == "In Transit");
        }

        public async Task<int> GetDeliveredParcelsAsync()
        {
            return await _context.Parcels
                .CountAsync(p =>
                    !p.IsDeleted &&
                    p.CurrentStatus == "Delivered");
        }

        public async Task<int> GetDelayedParcelsAsync()
        {
            var now = DateTime.UtcNow;

            return await _context.Parcels
                .CountAsync(p =>
                    !p.IsDeleted &&
                    p.CurrentStatus != "Delivered" &&
                    p.ExpectedDeliveryDate.HasValue &&
                    p.ExpectedDeliveryDate.Value < now);
        }

        public async Task<List<(string Status, int Count)>> GetStatusOverviewAsync()
        {
            return await _context.Parcels
                .Where(p => !p.IsDeleted)
                .GroupBy(p => p.CurrentStatus)
                .Select(g => new
                {
                    Status = g.Key,
                    Count = g.Count()
                })
                .AsNoTracking()
                .ToListAsync()
                .ContinueWith(task =>
                    task.Result
                        .Select(x => (x.Status, x.Count))
                        .ToList());
        }

        public async Task<List<Parcel>> GetRecentParcelsAsync(int count)
        {
            return await _context.Parcels
                .Where(p => !p.IsDeleted)

                .Include(p => p.Customer)

                .Include(p => p.Route)
                    .ThenInclude(r => r!.DestinationHub)

                .OrderByDescending(p => p.BookedAt)

                .Take(count)

                .AsNoTracking()

                .ToListAsync();
        }
    }
}