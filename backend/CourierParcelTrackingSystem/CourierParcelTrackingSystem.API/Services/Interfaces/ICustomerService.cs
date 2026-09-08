using CourierParcelTrackingSystem.API.DTOs;

namespace CourierParcelTrackingSystem.API.Services.Interfaces
{
    public interface ICustomerService
    {
        Task<PagedCustomerResponseDto> GetCustomersAsync(int page, int pageSize,  string? search);

        Task<CustomerResponseDto> AddCustomerAsync(CreateCustomerRequestDto createCustomerRequest);

        //Task<UpdateCustomerRequestDto> UpdateCustomerAsync(UpdateCustomerRequestDto updateCustomerRequestDtoS);
        Task<CustomerResponseDto?> UpdateCustomerAsync(int customerId, UpdateCustomerRequestDto updateCustomerRequest);

        Task<bool> DeleteCustomerAsync(int customerId);

        Task<CustomerResponseDto> GetCustomerById(int id);
    }
}
