using CourierParcelTrackingSystem.API.Data;
using CourierParcelTrackingSystem.API.Entities;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CourierParcelTrackingSystem.API.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ApplicationDbContext _context;

        public CustomerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetCustomerCountAsync()
        {
            return await _context.Customers
                .CountAsync(c => !c.IsDeleted);
        }

        public async Task AddCustomerAsync(Customer customer)
        {
            await _context.Customers.AddAsync(customer);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteCustomerAsync(Customer customer)
        {
            _context.Customers.Remove(customer);

            await _context.SaveChangesAsync();
        }

        public async Task<Customer?> GetCustomerByIdAsync(int customerId)
        {
            return await _context.Customers.Include(c => c.CustomerDetail).FirstOrDefaultAsync(c => c.CustomerId == customerId);
        }

        public async Task<List<Customer>> GetCustomersAsync(int page,int pageSize,string? search)
        {
            var query = _context.Customers.Include(c => c.CustomerDetail).AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(c =>
                    c.CustomerName.Contains(search) ||
                    c.Email.Contains(search) ||
                    c.CustomerCode.Contains(search));
            }

            return await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        public async Task<int> GetCustomerCountAsync(string? search)
        {
            var query = _context.Customers
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(c =>
                    c.CustomerName.Contains(search) ||
                    c.Email.Contains(search) ||
                    c.CustomerDetail!.Phone!.Contains(search));
            }

            return await query.CountAsync();
        }

        public async Task UpdateCustomerAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}