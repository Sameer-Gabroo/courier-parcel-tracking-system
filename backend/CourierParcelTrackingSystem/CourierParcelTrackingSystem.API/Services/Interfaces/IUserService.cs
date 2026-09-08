using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.DTOs.UserDTO;
using CourierParcelTrackingSystem.API.Entities;

namespace CourierParcelTrackingSystem.API.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserResponseDto>> GetAllAsync();

        Task<UserResponseDto> CreateUserAsync(CreateUserRequestDto createUserRequest);

        Task<UserResponseDto?> UpdateUserAsync( int userId, UpdateUserRequestDto updateUserRequest);

        Task<bool> DeleteUserAsync(int userId);

        Task<User?> GetUserById(int id);


    }
}
