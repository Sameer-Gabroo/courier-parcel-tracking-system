using CourierParcelTrackingSystem.API.DTOs.AuthDTO;

namespace CourierParcelTrackingSystem.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDto> LoginAsync(LoginRequestDto loginRequest);
    }
}