using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourierParcelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RouteController : ControllerBase
    {
        private readonly IRouteService _routeService;

        public RouteController(IRouteService routeService)
        {
            _routeService = routeService;
        }

        // Admin, Dispatcher, Booking Agent, Courier
        [HttpGet]
        [Authorize(Roles = "Admin,Dispatcher,Booking Agent,Courier")]
        public async Task<IActionResult> GetRoutes(
            int page = 1,
            int pageSize = 10,
            string? search = null)
        {
            var routes = await _routeService
                .GetRoutesAsync(page, pageSize, search);

            return Ok(routes);
        }

        // Admin, Dispatcher, Booking Agent, Courier
        [HttpGet("{routeId}")]
        [Authorize(Roles = "Admin,Dispatcher,Booking Agent,Courier")]
        public async Task<IActionResult> GetRouteById(int routeId)
        {
            var route = await _routeService
                .GetRouteByIdAsync(routeId);

            if (route == null)
            {
                return NotFound();
            }

            return Ok(route);
        }

        // Admin only
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddRoute(
            CreateRouteRequestDto createRouteRequest)
        {
            var route = await _routeService
                .AddRouteAsync(createRouteRequest);

            return Ok(route);
        }

        // Admin only
        [HttpPut("{routeId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateRoute(
            int routeId,
            UpdateRouteRequestDto updateRouteRequest)
        {
            var route = await _routeService
                .UpdateRouteAsync(
                    routeId,
                    updateRouteRequest);

            if (route == null)
            {
                return NotFound();
            }

            return Ok(route);
        }

        // Admin only
        [HttpDelete("{routeId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRoute(int routeId)
        {
            var isDeleted = await _routeService
                .DeleteRouteAsync(routeId);

            if (!isDeleted)
            {
                return NotFound();
            }

            return Ok("Route deleted successfully.");
        }
    }
}