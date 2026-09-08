using CourierParcelTrackingSystem.API.Entities;

namespace CourierParcelTrackingSystem.API.Repositories.Interfaces
{
    public interface IDashboardRepository
    {
        Task<int> GetTotalParcelsAsync();

        Task<int> GetInTransitParcelsAsync();

        Task<int> GetDeliveredParcelsAsync();

        Task<int> GetDelayedParcelsAsync();

        Task<List<(string Status, int Count)>> GetStatusOverviewAsync();

        Task<List<Parcel>> GetRecentParcelsAsync(int count);
    }
}