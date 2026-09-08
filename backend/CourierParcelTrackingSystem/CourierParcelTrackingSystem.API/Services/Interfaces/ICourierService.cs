using CourierParcelTrackingSystem.API.DTOs;

namespace CourierParcelTrackingSystem.API.Services.Interfaces
{
    public interface ICourierService
    {
        Task<List<CourierResponseDto>> GetCouriersAsync(
            int page,
            int pageSize,
            string? search
        );

        Task<CourierResponseDto?> GetCourierByIdAsync(int courierId, int? loggedInCourierId, string? role);
        Task<List<CourierResponseDto>> GetAvailableCouriersForParcelAsync(
    int parcelId
);

        Task<CourierResponseDto> AddCourierAsync(
            CreateCourierRequestDto createCourierRequest
        );

        Task<CourierResponseDto?> UpdateCourierAsync(
            int courierId,
            UpdateCourierRequestDto updateCourierRequest
        );

        Task<bool> DeleteCourierAsync(int courierId);
    }
}