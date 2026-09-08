using CourierParcelTrackingSystem.API.Entities;

namespace CourierParcelTrackingSystem.API.Repositories.Interfaces
{
    public interface ICourierRepository
    {
        Task<List<Courier>> GetCouriersAsync( int page,int pageSize,string? search );

        Task<Courier?> GetCourierByIdAsync(int courierId);

        Task AddCourierAsync(Courier courier);

        Task UpdateCourierAsync();

        Task DeleteCourierAsync(Courier courier);

        Task<int> GetCourierCountAsync();

        Task<List<Courier>> GetAvailableCouriersForParcelAsync(int parcelId);
    }
}