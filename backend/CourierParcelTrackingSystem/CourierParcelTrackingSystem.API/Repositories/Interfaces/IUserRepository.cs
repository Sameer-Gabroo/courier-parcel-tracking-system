using CourierParcelTrackingSystem.API.Entities;

namespace CourierParcelTrackingSystem.API.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);

        Task<List<string>> GetUserRolesAsync(int userId);

        Task<List<User>> GetAllAsync();

        Task AddUserAsync(User user);

        Task<int> GetCustomerCountAsync();
        Task AddUserWithCourierAsync(User user, Courier? courier);
        Task UpdateUserRoleAsync(int userId, int roleId);

        Task<Role?> GetRoleByIdAsync(int roleId);
        Task<Role?> GetRoleByNameAsync(string roleName);

        Task<User?> GetByIdAsync(int UserId);

        Task UpdateUserAsync(User user);

        Task DeleteUserAsyc(User user);


    }
}
