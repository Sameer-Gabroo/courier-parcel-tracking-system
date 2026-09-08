namespace CourierParcelTrackingSystem.API.DTOs
{
    public class ParcelRecipientRequestDto
    {
        public string ReceiverName { get; set; } = null!;

        public string? ReceiverPhone { get; set; }

        public string? ReceiverAddress { get; set; }
    }
}
