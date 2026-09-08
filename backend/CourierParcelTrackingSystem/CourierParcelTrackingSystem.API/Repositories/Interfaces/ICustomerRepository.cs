using CourierParcelTrackingSystem.API.Entities;

namespace CourierParcelTrackingSystem.API.Repositories.Interfaces
{
    public interface ICustomerRepository
    {
        Task<List<Customer>> GetCustomersAsync(int page, int pageSize,string? searc);

        Task AddCustomerAsync(Customer customer);
        Task<int> GetCustomerCountAsync(string? search);
        Task<Customer?> GetCustomerByIdAsync(int customerId);
        Task<int> GetCustomerCountAsync();
        Task UpdateCustomerAsync();

        Task DeleteCustomerAsync(Customer customer);
    }
}