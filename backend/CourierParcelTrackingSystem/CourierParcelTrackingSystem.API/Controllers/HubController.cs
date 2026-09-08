using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourierParcelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HubController : ControllerBase
    {
        private readonly IHubService _hubService;

        public HubController(IHubService hubService)
        {
            _hubService = hubService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Dispatcher,Booking Agent,Courier")]
        public async Task<IActionResult> GetHubs(
            int page = 1,
            int pageSize = 10,
            string? search = null)
        {
            var hubs = await _hubService
                .GetHubsAsync(page, pageSize, search);

            return Ok(hubs);
        }

        [HttpGet("{hubId}")]
        [Authorize(Roles = "Admin,Dispatcher,Booking Agent,Courier")]
        public async Task<IActionResult> GetHubById(int hubId)
        {
            var hub = await _hubService
                .GetHubByIdAsync(hubId);

            if (hub == null)
            {
                return NotFound();
            }

            return Ok(hub);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddHub(
            CreateHubRequestDto createHubRequest)
        {
            var hub = await _hubService
                .AddHubAsync(createHubRequest);

            return Ok(hub);
        }

        [HttpPut("{hubId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateHub(
            int hubId,
            UpdateHubRequestDto updateHubRequest)
        {
            var hub = await _hubService
                .UpdateHubAsync(
                    hubId,
                    updateHubRequest);

            if (hub == null)
            {
                return NotFound();
            }

            return Ok(hub);
        }

        [HttpDelete("{hubId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteHub(int hubId)
        {
            var isDeleted = await _hubService
                .DeleteHubAsync(hubId);

            if (!isDeleted)
            {
                return NotFound();
            }

            return Ok("Hub deleted successfully.");
        }
    }
}