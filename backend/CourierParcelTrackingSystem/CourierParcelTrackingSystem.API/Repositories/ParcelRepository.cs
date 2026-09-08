using CourierParcelTrackingSystem.API.Data;
using CourierParcelTrackingSystem.API.Entities;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CourierParcelTrackingSystem.API.Repositories
{
    public class ParcelRepository : IParcelRepository
    {
        private readonly ApplicationDbContext _context;

        public ParcelRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Parcel>> GetParcelsAsync( int page,  int pageSize,   string? search, string? status)
        {
            var query = _context.Parcels
             .Include(p => p.Customer)
             .Include(p => p.Courier)
             .Include(p => p.Route!)
                 .ThenInclude(r => r.OriginHub)
             .Include(p => p.Route!)
                 .ThenInclude(r => r.DestinationHub)
             .Include(p => p.ParcelDetails)
             .Include(p => p.ParcelRecipient)

             .Include(p => p.StatusEvents)
                 .ThenInclude(se => se.Courier)

             .Include(p => p.StatusEvents)
                 .ThenInclude(se => se.Hub)

             .Where(p => !p.IsDeleted)
             .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();

                query = query.Where(p =>
                    p.TrackingNumber.Contains(search) ||
                    p.CurrentStatus.Contains(search) ||
                    p.Customer.CustomerName.Contains(search) ||
                    (p.ParcelRecipient != null &&
                     p.ParcelRecipient.ReceiverName.Contains(search))
                );
            }

            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(p =>
                    p.CurrentStatus == status
                );
            }

            return await query
                .OrderByDescending(p => p.BookedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<List<Parcel>> GetCustomerParcelsAsync(int customerId)
        {
            return await _context.Parcels
                .Include(p => p.Customer)
                    .ThenInclude(c => c.CustomerDetail)
                .Include(p => p.Courier)
                .Include(p => p.Route)
                    .ThenInclude(r => r.OriginHub)
                .Include(p => p.Route)
                    .ThenInclude(r => r.DestinationHub)
                .Include(p => p.ParcelDetails)
                .Include(p => p.ParcelRecipient)
                .Include(p => p.StatusEvents)
                    .ThenInclude(se => se.Hub)
                .Include(p => p.StatusEvents)
                    .ThenInclude(se => se.Courier)
                .Where(p => p.CustomerId == customerId)
                .ToListAsync();
        }
        public async Task<Parcel?> GetParcelByIdAsync(int parcelId)
        {
            return await _context.Parcels
                .Include(p => p.Customer)

                .Include(p => p.Courier)

                .Include(p => p.Route!)
                    .ThenInclude(r => r.OriginHub)

                .Include(p => p.Route!)
                    .ThenInclude(r => r.DestinationHub)

                .Include(p => p.ParcelDetails)

                .Include(p => p.ParcelRecipient)

                .Include(p => p.StatusEvents)
                    .ThenInclude(se => se.Courier)

                .Include(p => p.StatusEvents)
                    .ThenInclude(se => se.Hub)

                .FirstOrDefaultAsync(p => p.ParcelId == parcelId);
        }

        public async Task AddParcelAsync(Parcel parcel)
        {
            await _context.Parcels.AddAsync(parcel);
            await _context.SaveChangesAsync();
        }

        public async Task<Parcel?> GetParcelForUpdateAsync(int parcelId)
        {
            return await _context.Parcels
     .Include(p => p.ParcelDetails)
     .Include(p => p.ParcelRecipient)
     .FirstOrDefaultAsync(p => p.ParcelId == parcelId);
        }

        public async Task UpdateParcelAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<Parcel?> GetParcelForDeleteAsync(int parcelId)
        {
            return await _context.Parcels
                .Include(p => p.ParcelDetails)
                .Include(p => p.ParcelRecipient)
                .FirstOrDefaultAsync(p => p.ParcelId == parcelId);
        }

        public async Task DeleteParcelAsync(Parcel parcel)
        {
            _context.ParcelDetails.RemoveRange(parcel.ParcelDetails);

            _context.Parcels.Remove(parcel);

            await _context.SaveChangesAsync();
        }

        public async Task<Parcel?> GetParcelByTrackingNumberAsync(
        string trackingNumber)
        {
            return await _context.Parcels
                .Include(p => p.ParcelDetails)
                .Include(p => p.Customer)
                .Include(p => p.Courier)
                .Include(p => p.Route!)
                    .ThenInclude(r => r.OriginHub)
                .Include(p => p.Route!)
                    .ThenInclude(r => r.DestinationHub)
                .Include(p => p.ParcelRecipient)
                .Include(p => p.StatusEvents)
                    .ThenInclude(se => se.Courier)
                .Include(p => p.StatusEvents)
                    .ThenInclude(se => se.Hub)
                .FirstOrDefaultAsync(
                    p => p.TrackingNumber == trackingNumber
                );
        }

        public async Task<List<Parcel>> GetPendingParcelsAsync()
        {
            return await _context.Parcels
                .Include(p => p.Customer)
                    .ThenInclude(c => c.CustomerDetail)

                .Include(p => p.ParcelRecipient)

                .Include(p => p.ParcelDetails)

                .Include(p => p.Route)
                    .ThenInclude(r => r!.OriginHub)

                .Include(p => p.Route)
                    .ThenInclude(r => r!.DestinationHub)

                .Where(p =>
                    p.CurrentStatus == "Pending" &&
                    !p.IsDeleted
                )
                .ToListAsync();
        }

        public async Task<List<Parcel>> GetCourierAssignedParcelsAsync(int courierId)
        {
            return await _context.Parcels
                .Include(p => p.Customer)
                    .ThenInclude(c => c.CustomerDetail)

                .Include(p => p.Courier)

                .Include(p => p.Route!)
                    .ThenInclude(r => r.OriginHub)

                .Include(p => p.Route!)
                    .ThenInclude(r => r.DestinationHub)

                .Include(p => p.ParcelRecipient)

                .Include(p => p.ParcelDetails)

                .Include(p => p.StatusEvents)
                    .ThenInclude(se => se.Hub)

                .Include(p => p.StatusEvents)
                    .ThenInclude(se => se.Courier)

                .Where(p => p.CourierId == courierId && !p.IsDeleted)

                .ToListAsync();
        }
        public async Task<Parcel?> GetParcelForAssignmentAsync(int parcelId)
        {
            return await _context.Parcels
                .Include(p => p.Customer)
                    .ThenInclude(c => c.CustomerDetail)

                .Include(p => p.Route)
                    .ThenInclude(r => r!.OriginHub)

                .Include(p => p.StatusEvents)

                .FirstOrDefaultAsync(
                    p => p.ParcelId == parcelId && !p.IsDeleted
                );
        }

        public async Task<Parcel?> GetParcelForCourierStatusAsync(int parcelId)
        {
            return await _context.Parcels
                .Include(p => p.StatusEvents)
                .FirstOrDefaultAsync(p => p.ParcelId == parcelId && !p.IsDeleted);
        }



        public async Task<int> GetParcelCountAsync(string? search, string? status)
        {
            var query = _context.Parcels
                .Where(p => !p.IsDeleted)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();

                query = query.Where(p =>
                    p.TrackingNumber.Contains(search) ||
                    p.CurrentStatus.Contains(search) ||
                    p.Customer.CustomerName.Contains(search) ||
                    (p.ParcelRecipient != null &&
                     p.ParcelRecipient.ReceiverName.Contains(search))
                );
            }

            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(p =>
                    p.CurrentStatus == status
                );
            }

            return await query.CountAsync();
        }
    }


}
