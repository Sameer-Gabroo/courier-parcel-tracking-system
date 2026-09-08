using CourierParcelTrackingSystem.API.Constants;
using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.Entities;
using CourierParcelTrackingSystem.API.Repositories;

using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using CourierParcelTrackingSystem.API.Services.Interfaces;

namespace CourierParcelTrackingSystem.API.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IUserRepository _userRepository;
        private readonly IUserContextService _userContextService;
        public CustomerService(ICustomerRepository customerRepository, IUserRepository userRepository,   IUserContextService userContextService)
        {
            _customerRepository = customerRepository;
            _userRepository = userRepository;
            _userContextService = userContextService;
        }
        public static string GenerateCustomerCode(int count)
        {
            return $"CUS-{(count + 1):D4}";
        }

        public async Task<CustomerResponseDto> AddCustomerAsync( CreateCustomerRequestDto createCustomerRequest)
        {
            try
            {
                var count = await _customerRepository.GetCustomerCountAsync();

                var customer = new Customer
                {
                    CustomerCode = CustomerService.GenerateCustomerCode(count),
                    CustomerName = createCustomerRequest.CustomerName,
                    Email = createCustomerRequest.Email,
                    IsActive = createCustomerRequest.IsActive,

                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = _userContextService.UserId,

                    IsDeleted = false,

                    CustomerDetail = new CustomerDetail
                    {
                        Phone = createCustomerRequest.Phone,
                        Address = createCustomerRequest.Address,
                        City = createCustomerRequest.City,
                        PostalCode = createCustomerRequest.PostalCode,
                        CreatedAt = DateTime.UtcNow
                    }
                };

                await _customerRepository.AddCustomerAsync(customer);

                var customerRole = await _userRepository
                    .GetRoleByNameAsync("Customer");

                if (customerRole == null)
                {
                    throw new Exception("Customer role not found.");
                }

                var user = new User
                {
                    UserName = customer.CustomerName,
                    Email = customer.Email,
                    PasswordHash = "Customer@123",
                    IsActive = customer.IsActive,
                    CreatedAt = DateTime.UtcNow,
                    IsDeleted = false,
                    CustomerId = customer.CustomerId,

                    UserDetail = new UserDetail
                    {
                        FirstName = customer.CustomerName.Split(' ')[0],

                        LastName = customer.CustomerName.Contains(' ')
                ? customer.CustomerName.Substring(
                    customer.CustomerName.IndexOf(' ') + 1)
                : "",

                        Phone = createCustomerRequest.Phone,
                        Address = createCustomerRequest.Address,
                        City = createCustomerRequest.City,

                        CreatedAt = DateTime.UtcNow
                    },

                    UserRoles = new List<UserRole>
    {
        new UserRole
        {
            RoleId = customerRole.RoleId,
            CreatedAt = DateTime.UtcNow
        }
    }
                };

                await _userRepository.AddUserAsync(user);

                return MapToCustomerResponse(customer);
            }
            catch (Exception ex)
            {
                throw new Exception(
                    ErrorMessages.CreateCustomerFailed,
                    ex);
            }
        }

        public async Task<bool> DeleteCustomerAsync(int customerId)
        {
            try
            {
                var customer = await _customerRepository
                    .GetCustomerByIdAsync(customerId);

                if (customer == null)
                {
                    return false;
                }

                await _customerRepository.DeleteCustomerAsync(customer);

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(
                    ErrorMessages.DeleteCustomerFailed,
                    ex);
            }
        }

        public async Task<CustomerResponseDto> GetCustomerById(int id)
        {
            var customer = await _customerRepository.GetCustomerByIdAsync(id);

            return MapToCustomerResponse(customer);
            
        }

        public async Task<PagedCustomerResponseDto> GetCustomersAsync(
    int page,
    int pageSize,
    string? search)
        {
            try
            {
                var customers = await _customerRepository
                    .GetCustomersAsync(
                        page,
                        pageSize,
                        search);

                var totalCount = await _customerRepository
                    .GetCustomerCountAsync(search);

                var totalPages = (int)Math.Ceiling(
                    totalCount / (double)pageSize
                );

                return new PagedCustomerResponseDto
                {
                    Customers = customers
                        .Select(MapToCustomerResponse)
                        .ToList(),

                    TotalCount = totalCount,

                    TotalPages = totalPages
                };
            }
            catch (Exception ex)
            {
                throw new Exception(
                    ErrorMessages.GetCustomersFailed,
                    ex);
            }
        }

        public async Task<CustomerResponseDto?> UpdateCustomerAsync(
      int customerId,
      UpdateCustomerRequestDto updateCustomerRequest)
        {
            try
            {
                var customer = await _customerRepository
                    .GetCustomerByIdAsync(customerId);

                if (customer == null)
                {
                    return null;
                }

                // Update Customer table
                customer.CustomerName = updateCustomerRequest.CustomerName;
                customer.Email = updateCustomerRequest.Email;
                customer.IsActive = updateCustomerRequest.IsActive;

                // Update CustomerDetail table
                if (customer.CustomerDetail != null)
                {
                    customer.CustomerDetail.Phone =
                        updateCustomerRequest.Phone;

                    customer.CustomerDetail.Address =
                        updateCustomerRequest.Address;

                    customer.CustomerDetail.City =
                        updateCustomerRequest.City;

                    customer.CustomerDetail.PostalCode =
                        updateCustomerRequest.PostalCode;
                }

                await _customerRepository.UpdateCustomerAsync();

                return MapToCustomerResponse(customer);
            }
            catch (Exception ex)
            {
                throw new Exception(
                    ErrorMessages.UpdateCustomerFailed,
                    ex);
            }
        }
        private CustomerResponseDto MapToCustomerResponse(Customer customer)
        {
            return new CustomerResponseDto
            {
                CustomerId = customer.CustomerId,
                CustomerCode = customer.CustomerCode,
                CustomerName = customer.CustomerName,
                Email = customer.Email,
                Phone = customer.CustomerDetail?.Phone,
                Address = customer.CustomerDetail?.Address,
                City = customer.CustomerDetail?.City,
                PostalCode = customer.CustomerDetail?.PostalCode,
                IsActive = customer.IsActive
            };
        }
    }
}