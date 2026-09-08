namespace CourierParcelTrackingSystem.API.DTOs
{
    public class UpdateParcelRequestDto
    {
        public int CustomerId { get; set; }
        public int RouteId { get; set; }

        public ParcelRecipientRequestDto ParcelRecipient { get; set; } = null!;

        public ParcelDetailRequestDto ParcelDetail { get; set; } = null!;
    }
}
