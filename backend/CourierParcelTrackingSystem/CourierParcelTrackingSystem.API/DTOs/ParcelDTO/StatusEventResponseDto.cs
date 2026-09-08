namespace CourierParcelTrackingSystem.API.DTOs
{
    public class StatusEventResponseDto
    {
        public int StatusEventId { get; set; }

        public int? HubId { get; set; }

        public string? HubName { get; set; }

        public int? CourierId { get; set; }

        public string? CourierName { get; set; }

        public string Status { get; set; } = null!;

        public DateTime EventTime { get; set; }

        public string? Remarks { get; set; }
    }
}
