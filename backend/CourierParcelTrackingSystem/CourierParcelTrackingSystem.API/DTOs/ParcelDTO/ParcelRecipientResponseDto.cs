namespace CourierParcelTrackingSystem.API.DTOs
{
    public class ParcelRecipientResponseDto
    {
        public int ParcelRecipientId { get; set; }

        public string ReceiverName { get; set; } = null!;

        public string? ReceiverPhone { get; set; }

        public string? ReceiverAddress { get; set; }
    }
}
