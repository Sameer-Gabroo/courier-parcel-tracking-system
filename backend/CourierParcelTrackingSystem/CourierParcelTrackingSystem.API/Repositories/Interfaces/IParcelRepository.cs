using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.Entities;

namespace CourierParcelTrackingSystem.API.Repositories.Interfaces
{
    public interface IParcelRepository
    {
        Task<List<Parcel>> GetParcelsAsync( int page, int pageSize, string? search, string? status);

        Task<int> GetParcelCountAsync( string? search, string? status);

        Task<Parcel?> GetParcelByIdAsync(int parcelId);

        Task<List<Parcel>> GetCustomerParcelsAsync(int customerId);

        Task AddParcelAsync(Parcel parcel);

        Task<Parcel?> GetParcelForUpdateAsync(int parcelId);

        Task UpdateParcelAsync();


        Task<Parcel?> GetParcelForDeleteAsync(int parcelId);

        Task DeleteParcelAsync(Parcel parcel);

        Task<Parcel?> GetParcelByTrackingNumberAsync(string trackingNumber);

        Task<List<Parcel>> GetPendingParcelsAsync();

        Task<List<Parcel>> GetCourierAssignedParcelsAsync(int courierId);

        Task<Parcel?> GetParcelForAssignmentAsync(int parcelId);

        Task<Parcel?> GetParcelForCourierStatusAsync(int parcelId);

    }
}
