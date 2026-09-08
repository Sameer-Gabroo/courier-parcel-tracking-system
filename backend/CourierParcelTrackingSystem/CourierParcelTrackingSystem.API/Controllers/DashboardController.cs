using CourierParcelTrackingSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourierParcelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(
            IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("Summary")]
        [Authorize(Roles = "Admin,Booking Agent,Dispatcher,Courier")]
        public async Task<IActionResult> GetDashboardSummary()
        {
            var response =
                await _dashboardService.GetDashboardSummaryAsync();

            return Ok(response);
        }
    }
}