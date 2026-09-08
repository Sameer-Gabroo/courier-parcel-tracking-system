using CourierParcelTrackingSystem.API.Constants;
using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.DTOs.UserDTO;
using CourierParcelTrackingSystem.API.Entities;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using CourierParcelTrackingSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace CourierParcelTrackingSystem.API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ICourierRepository _courierRepository;
        private readonly PasswordHasher<User> _passwordHasher;

        public UserService(IUserRepository userRepository, ICourierRepository courierRepository)
        {
            _userRepository = userRepository;
            _courierRepository = courierRepository;
            _passwordHasher = new PasswordHasher<User>();

        }

        public async Task<List<UserResponseDto>> GetAllAsync()
        {
            try
            {
                var users = await _userRepository.GetAllAsync();
                return users.Select(MapToUserResponse).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ErrorMessages.GetUsersFailed, ex);
            }
        }

        public async Task<UserResponseDto> CreateUserAsync(CreateUserRequestDto createUserRequest)
        {
            try
            {
                var role = await _userRepository.GetRoleByIdAsync(createUserRequest.RoleId);

                if (role == null)
                {
                    throw new Exception("Role not found.");
                }

                var user = new User
                {
                    UserName = createUserRequest.UserName,
                    Email = createUserRequest.Email,
                    PasswordHash = _passwordHasher.HashPassword(null!,  createUserRequest.Password),
                    IsActive = createUserRequest.IsActive,
                    CreatedAt = DateTime.UtcNow,
                    IsDeleted = false,
                    UserDetail = new UserDetail
                    {
                        FirstName = createUserRequest.FirstName,
                        LastName = createUserRequest.LastName,
                        Phone = createUserRequest.Phone,
                        Address = createUserRequest.Address,
                        City = createUserRequest.City,
                        CreatedAt = DateTime.UtcNow
                    },
                    UserRoles = new List<UserRole>
                    {
                        new UserRole
                        {
                            RoleId = createUserRequest.RoleId,
                            CreatedAt = DateTime.UtcNow
                        }
                    }
                };

                Courier? courier = null;

                if (role.RoleName == "Courier")
                {
                    var count = await _courierRepository.GetCourierCountAsync();

                    courier = new Courier
                    {
                        User = user,
                        CourierCode = CourierService.GenerateCourierCode(count),
                        CourierName = $"{createUserRequest.FirstName} {createUserRequest.LastName}",
                        Email = createUserRequest.Email,
                        City = createUserRequest.City,
                        IsActive = createUserRequest.IsActive,
                        CreatedAt = DateTime.UtcNow,
                        IsDeleted = false,
                        CourierDetail = new CourierDetail
                        {
                            Phone = createUserRequest.Phone,
                            Address = createUserRequest.Address,
                            EmergencyContact = createUserRequest.EmergencyContact,
                            EmergencyPhone = createUserRequest.EmergencyPhone,
                            CreatedAt = DateTime.UtcNow
                        }
                    };
                }

                await _userRepository.AddUserWithCourierAsync(user, courier);

                user.UserRoles.First().Role = role;
                return MapToUserResponse(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ErrorMessages.CreateUserFailed, ex);
            }
        }

        public async Task<UserResponseDto?> UpdateUserAsync(int userId,  UpdateUserRequestDto updateUserRequest)
        {
            try
            {
                var user = await _userRepository.GetByIdAsync(userId);

                if (user == null)
                {
                    return null;
                }

                if (!string.IsNullOrWhiteSpace(updateUserRequest.Password))
                {
                    user.PasswordHash = _passwordHasher.HashPassword(
                        user,
                        updateUserRequest.Password
                    );
                }

                user.IsActive = updateUserRequest.IsActive;

                if (updateUserRequest.RoleId.HasValue)
                {
                    var role = await _userRepository
                        .GetRoleByIdAsync(updateUserRequest.RoleId.Value);

                    if (role == null)
                    {
                        throw new Exception("Selected role not found.");
                    }

                    await _userRepository.UpdateUserRoleAsync(
                        userId,
                        updateUserRequest.RoleId.Value);
                }

                user.UpdatedAt = DateTime.UtcNow;

                await _userRepository.UpdateUserAsync(user);

                user = await _userRepository.GetByIdAsync(userId);

                return MapToUserResponse(user!);
            }
            catch (Exception ex)
            {
                throw new Exception(
                    ErrorMessages.UpdateUserFailed,
                    ex);
            }
        }
        private UserResponseDto MapToUserResponse(User user)
        {
            return new UserResponseDto
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email,
                IsActive = user.IsActive,

                RoleId = user.UserRoles
                    .Select(ur => ur.RoleId)
                    .FirstOrDefault(),

                Roles = user.UserRoles
                    .Select(ur => ur.Role.RoleName)
                    .ToList(),

                FirstName = user.UserDetail?.FirstName,
                LastName = user.UserDetail?.LastName,
                Phone = user.UserDetail?.Phone,
                Address = user.UserDetail?.Address,
                City = user.UserDetail?.City
            };
        }

        public Task<User?> GetUserById(int id)
        {
            return _userRepository.GetByIdAsync(id);
        }

        public Task<bool> DeleteUserAsync(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
