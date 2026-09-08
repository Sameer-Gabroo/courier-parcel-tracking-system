namespace CourierParcelTrackingSystem.API.DTOs
{
    public class CreateParcelRequestDto
    {
        //public string TrackingNumber { get; set; } = null!;

        public int CustomerId { get; set; }

        public int RouteId { get; set; }


        public ParcelRecipientRequestDto ParcelRecipient { get; set; } = null!;

        public List<ParcelDetailRequestDto> ParcelDetails { get; set; }
            = new List<ParcelDetailRequestDto>();
    }
}
