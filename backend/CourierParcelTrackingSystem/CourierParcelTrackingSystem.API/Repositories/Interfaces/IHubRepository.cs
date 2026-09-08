using CourierParcelTrackingSystem.API.Entities;

namespace CourierParcelTrackingSystem.API.Repositories.Interfaces
{
    public interface IHubRepository
    {
        Task<List<Hub>> GetHubsAsync(int page, int pageSize, string? search );

        Task<Hub?> GetHubByIdAsync(int hubId);

        Task AddHubAsync(Hub hub);

        Task UpdateHubAsync();

        Task DeleteHubAsync(Hub hub);
    }
}