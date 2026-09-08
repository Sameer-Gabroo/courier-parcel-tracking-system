using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CourierParcelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParcelController : ControllerBase
    {
        private readonly IParcelService _parcelService;

        public ParcelController(IParcelService parcelService)
        {
            _parcelService = parcelService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Booking Agent,Dispatcher")]
        public async Task<IActionResult> GetParcels(
            int page = 1,
            int pageSize = 10,
            string? search = null,
            string? status = null)
        {
            var parcels = await _parcelService
                .GetParcelsAsync(
                    page,
                    pageSize,
                    search,
                    status);

            return Ok(parcels);
        }

      
        [HttpGet("{parcelId}")]
        [Authorize(Roles = "Admin,Booking Agent,Dispatcher")]
        public async Task<IActionResult> GetParcelById(int parcelId)
        {
            var parcel = await _parcelService
                .GetParcelByIdAsync(parcelId);

            if (parcel == null)
            {
                return NotFound();
            }

            return Ok(parcel);
        }

        
        [HttpGet("customer")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetCustomerParcels()
        {
            var customerIdClaim = User.FindFirst("CustomerId");

            if (customerIdClaim == null)
            {
                return Unauthorized();
            }

            int customerId = int.Parse(customerIdClaim.Value);

            var parcels = await _parcelService
                .GetCustomerParcelsAsync(customerId);

            return Ok(parcels);
        }

       
        [HttpPost]
        [Authorize(Roles = "Admin,Booking Agent")]
        public async Task<IActionResult> AddParcel(
            CreateParcelRequestDto createParcelRequest)
        {
            var parcel = await _parcelService
                .AddParcelAsync(createParcelRequest);

            return Ok(parcel);
        }

        
        [HttpPut("{parcelId}")]
        [Authorize(Roles = "Admin,Booking Agent")]
        public async Task<IActionResult> UpdateParcel(
            int parcelId,
            UpdateParcelRequestDto updateParcelRequest)
        {
            var parcel = await _parcelService
                .UpdateParcelAsync(
                    parcelId,
                    updateParcelRequest);

            if (parcel == null)
            {
                return NotFound();
            }

            return Ok(parcel);
        }

        [HttpDelete("{parcelId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteParcel(int parcelId)
        {
            var result = await _parcelService
                .DeleteParcelAsync(parcelId);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

       
        [HttpGet("track/{trackingNumber}")]
        [Authorize(Roles = "Admin,Booking Agent,Dispatcher,Courier")]
        public async Task<IActionResult> TrackParcel(
            string trackingNumber)
        {
            var parcel = await _parcelService
                .GetParcelByTrackingNumberAsync(trackingNumber);

            if (parcel == null)
            {
                return NotFound();
            }

            return Ok(parcel);
        }

      
        [HttpGet("pending")]
        [Authorize(Roles = "Admin,Booking Agent,Dispatcher")]
        public async Task<IActionResult> GetPendingParcels()
        {
            var parcels = await _parcelService
                .GetPendingParcelsAsync();

            return Ok(parcels);
        }


        [HttpPut("{parcelId}/assign")]
        [Authorize(Roles = "Admin,Booking Agent,Dispatcher")]
        public async Task<IActionResult> AssignParcel(
            int parcelId,
            AssignParcelRequestDto assignParcelRequest)
        {
            var parcel = await _parcelService
                .AssignParcelAsync(
                    parcelId,
                    assignParcelRequest);

            if (parcel == null)
            {
                return NotFound();
            }

            return Ok(parcel);
        }


        [HttpGet("courier")]
        [Authorize(Roles = "Courier")]
        public async Task<IActionResult> GetCourierAssignedParcels()
        {
            var courierIdClaim = User.FindFirst("CourierId");

            if (courierIdClaim == null)
            {
                return Unauthorized();
            }

            int courierId = int.Parse(courierIdClaim.Value);

            var parcels = await _parcelService
                .GetCourierAssignedParcelsAsync(courierId);

            return Ok(parcels);
        }

        [HttpPut("{parcelId}/courier-status")]
        [Authorize(Roles = "Courier")]
        public async Task<IActionResult> UpdateCourierParcelStatus(
            int parcelId,
            UpdateCourierParcelStatusRequestDto updateStatusRequest)
        {
            var courierIdClaim = User.FindFirst("CourierId");

            if (courierIdClaim == null)
            {
                return Unauthorized();
            }

            int courierId = int.Parse(courierIdClaim.Value);

            var parcel = await _parcelService
                .UpdateCourierParcelStatusAsync(
                    parcelId,
                    courierId,
                    updateStatusRequest);

            if (parcel == null)
            {
                return NotFound();
            }

            return Ok(parcel);
        }
    }
}