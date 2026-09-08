namespace CourierParcelTrackingSystem.API.DTOs
{
    public class CourierResponseDto
    {
        public int CourierId { get; set; }

        public string CourierCode { get; set; } = null!;

        public string CourierName { get; set; } = null!;

        public string? Email { get; set; }

        public string? City { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public string? EmergencyContact { get; set; }

        public string? EmergencyPhone { get; set; }

        public bool IsActive { get; set; }
    }
}