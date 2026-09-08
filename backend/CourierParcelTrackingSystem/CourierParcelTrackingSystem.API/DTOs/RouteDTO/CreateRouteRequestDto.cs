namespace CourierParcelTrackingSystem.API.DTOs
{
    public class CreateRouteRequestDto
    {
        public string RouteCode { get; set; } = null!;

        public int OriginHubId { get; set; }

        public int DestinationHubId { get; set; }

        public decimal DistanceKm { get; set; }

        public decimal? EstimatedHours { get; set; }

        public bool IsActive { get; set; }
    }
}