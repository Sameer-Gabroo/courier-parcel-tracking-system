using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CourierParcelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourierController : ControllerBase
    {
        private readonly ICourierService _courierService;

        public CourierController(ICourierService courierService)
        {
            _courierService = courierService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Dispatcher")]
        public async Task<IActionResult> GetCouriers( int page = 1,  int pageSize = 10,  string? search = null)
        {
            var couriers = await _courierService.GetCouriersAsync( page, pageSize, search);

            return Ok(couriers);
        }


   

        [HttpGet("me")]
        [Authorize(Roles = "Courier")]
        public async Task<IActionResult> GetMyCourier()
        {
            var courierIdClaim = User.FindFirst("CourierId");

            if (courierIdClaim == null)
            {
                return Unauthorized();
            }

            int courierId = int.Parse(courierIdClaim.Value);

            var courier = await _courierService
                .GetCourierByIdAsync(
                    courierId,
                    courierId,
                    "Courier");

            if (courier == null)
            {
                return NotFound();
            }

            return Ok(courier);
        }


    

        [HttpGet("available-for-parcel/{parcelId}")]
        [Authorize(Roles = "Admin,Booking Agent,Dispatcher")]
        public async Task<IActionResult> GetAvailableCouriersForParcel(
            int parcelId)
        {
            var couriers = await _courierService
                .GetAvailableCouriersForParcelAsync(parcelId);

            return Ok(couriers);
        }


      

        [HttpGet("{courierId}")]
        [Authorize(Roles = "Admin,Courier")]
        public async Task<IActionResult> GetCourierById( int courierId)
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            int? loggedInCourierId = null;

            if (role == "Courier")
            {
                var courierIdClaim =
                    User.FindFirst("CourierId");

                if (courierIdClaim == null)
                {
                    return Unauthorized();
                }

                loggedInCourierId =
                    int.Parse(courierIdClaim.Value);
            }

            var courier = await _courierService
                .GetCourierByIdAsync(
                    courierId,
                    loggedInCourierId,
                    role);

            if (courier == null)
            {
                return NotFound();
            }

            return Ok(courier);
        }


      

        [HttpPut("{courierId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCourier(
            int courierId,
            UpdateCourierRequestDto updateCourierRequest)
        {
            var courier = await _courierService
                .UpdateCourierAsync(
                    courierId,
                    updateCourierRequest);

            if (courier == null)
            {
                return NotFound();
            }

            return Ok(courier);
        }


        

        [HttpDelete("{courierId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCourier(
            int courierId)
        {
            var isDeleted = await _courierService
                .DeleteCourierAsync(courierId);

            if (!isDeleted)
            {
                return NotFound();
            }

            return Ok("Courier deleted successfully.");
        }
    }
}