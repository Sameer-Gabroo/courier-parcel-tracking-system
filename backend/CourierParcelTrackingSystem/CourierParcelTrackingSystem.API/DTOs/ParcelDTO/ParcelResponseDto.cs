namespace CourierParcelTrackingSystem.API.DTOs
{
    public class ParcelResponseDto
    {
        public int ParcelId { get; set; }

        public string TrackingNumber { get; set; } = null!;

        // Customer
        public int CustomerId { get; set; }
        public string CustomerName { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public string? CustomerPhone { get; set; }
        public string? CustomerAddress { get; set; }

        // Courier
        public int? CourierId { get; set; }
        public string? CourierName { get; set; }

        // Route
        public int? RouteId { get; set; }
        public string? RouteCode { get; set; }

        // Hubs
        public string? OriginHubName { get; set; }
        public string? DestinationHubName { get; set; }

        // Parcel information
        public string CurrentStatus { get; set; } = null!;

        public DateTime BookedAt { get; set; }

        public DateTime? ExpectedDeliveryDate { get; set; }

        public DateTime? ActualDeliveryDate { get; set; }
     
        
        public string? CustomerCity { get; set; }

        public bool IsActive { get; set; }

    public List<ParcelDetailResponseDto> ParcelDetails { get; set; }
    = new List<ParcelDetailResponseDto>();

        public ParcelRecipientResponseDto? ParcelRecipient { get; set; }

        public List<StatusEventResponseDto> StatusEvents { get; set; }
            = new List<StatusEventResponseDto>();

    }
}
