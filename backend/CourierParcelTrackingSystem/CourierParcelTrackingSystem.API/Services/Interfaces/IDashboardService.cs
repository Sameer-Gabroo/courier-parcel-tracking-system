using CourierParcelTrackingSystem.API.DTOs.DashboardDTO;

namespace CourierParcelTrackingSystem.API.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardResponseDto> GetDashboardSummaryAsync();
    }
}