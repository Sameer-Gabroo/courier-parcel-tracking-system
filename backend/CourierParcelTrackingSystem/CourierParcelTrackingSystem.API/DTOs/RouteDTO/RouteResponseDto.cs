namespace CourierParcelTrackingSystem.API.DTOs
{
    public class RouteResponseDto
    {
        public int RouteId { get; set; }

        public string RouteCode { get; set; } = null!;

        public int OriginHubId { get; set; }

        public string OriginHubName { get; set; } = null!;

        public int DestinationHubId { get; set; }

        public string DestinationHubName { get; set; } = null!;

        public decimal DistanceKm { get; set; }

        public decimal? EstimatedHours { get; set; }

        public bool IsActive { get; set; }
    }
}