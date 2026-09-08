using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CourierParcelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Booking Agent")]
        public async Task<IActionResult> GetCustomers(
            int page = 1,
            int pageSize = 10,
            string? search = null)
        {
            var customers = await _customerService
                .GetCustomersAsync(page, pageSize, search);

            return Ok(customers);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Booking Agent")]
        public async Task<IActionResult> AddCustomer(
            CreateCustomerRequestDto createCustomerRequest)
        {
            var customer = await _customerService
                .AddCustomerAsync(createCustomerRequest);

            return Ok(customer);
        }

        [HttpPut("{customerId}")]
        [Authorize(Roles = "Admin,Booking Agent")]
        public async Task<IActionResult> UpdateCustomer(
            int customerId,
            UpdateCustomerRequestDto updateCustomerRequest)
        {
            var customer = await _customerService
                .UpdateCustomerAsync(
                    customerId,
                    updateCustomerRequest);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        [HttpDelete("{customerId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCustomer(int customerId)
        {
            var isDeleted = await _customerService
                .DeleteCustomerAsync(customerId);

            if (!isDeleted)
            {
                return NotFound();
            }

            return Ok("Customer deleted successfully.");
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Booking Agent")]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            var customer = await _customerService
                .GetCustomerById(id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        [HttpGet("me")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetMyCustomer()
        {
            var customerIdClaim =
                User.FindFirst("CustomerId");

            if (customerIdClaim == null)
            {
                return Unauthorized();
            }

            int customerId =
                int.Parse(customerIdClaim.Value);

            var customer = await _customerService
                .GetCustomerById(customerId);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }
    }
}