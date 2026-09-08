namespace CourierParcelTrackingSystem.API.DTOs
{
    public class UpdateCourierParcelStatusRequestDto
    {
        public int CourierId { get; set; }

        public string Status { get; set; } = null!;

        public int? HubId { get; set; }

        public string? Remarks { get; set; }
    }
}
