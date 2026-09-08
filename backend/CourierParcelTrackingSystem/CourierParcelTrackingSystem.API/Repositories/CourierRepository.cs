using CourierParcelTrackingSystem.API.Data;
using CourierParcelTrackingSystem.API.Entities;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CourierParcelTrackingSystem.API.Repositories
{
    public class CourierRepository : ICourierRepository
    {
        private readonly ApplicationDbContext _context;

        public CourierRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Courier>> GetCouriersAsync(int page, int pageSize,  string? search)
        {
            var query = _context.Couriers.Include(c => c.CourierDetail) .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(c =>
                    c.CourierName.Contains(search) ||
                    c.CourierCode.Contains(search) ||
                    (c.Email != null && c.Email.Contains(search)) ||
                    (c.City != null && c.City.Contains(search))
                );
            }

            return await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<Courier?> GetCourierByIdAsync(int courierId)
        {
            return await _context.Couriers.Include(c => c.CourierDetail)  .FirstOrDefaultAsync(c => c.CourierId == courierId);
        }

        public async Task AddCourierAsync(Courier courier)
        {
            await _context.Couriers.AddAsync(courier);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateCourierAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCourierAsync(Courier courier)
        {
            _context.Couriers.Remove(courier);

            await _context.SaveChangesAsync();
        }

        public async Task<int> GetCourierCountAsync()
        {
            return await _context.Couriers.CountAsync();
        }

        public async Task<List<Courier>> GetAvailableCouriersForParcelAsync(int parcelId)
        {
            var customerCity = await _context.Parcels
                .Where(p => p.ParcelId == parcelId && !p.IsDeleted)
                .Select(p => p.Customer.CustomerDetail!.City)
                .FirstOrDefaultAsync();

            if (string.IsNullOrWhiteSpace(customerCity))
            {
                return new List<Courier>();
            }

            var busyStatuses = new[]
                    {
                "Assigned",
                "Picked Up",
                "In Transit",
                "Out for Delivery"
            };

            return await _context.Couriers
                .Include(c => c.CourierDetail)
                .Where(c =>
                    c.IsActive &&
                    !c.IsDeleted &&
                    c.City != null &&
                    c.City == customerCity

                    //!c.Parcels.Any(p =>
                    //    !p.IsDeleted &&
                    //    busyStatuses.Contains(p.CurrentStatus)
                    //)
                )
                .ToListAsync();
        }
    }
}