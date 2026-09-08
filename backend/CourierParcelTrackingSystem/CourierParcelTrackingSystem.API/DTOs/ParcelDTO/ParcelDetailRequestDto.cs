namespace CourierParcelTrackingSystem.API.DTOs
{
    public class ParcelDetailRequestDto
    {
        public int ParcelDetailId { get; set; }

        public string ItemName { get; set; } = null!;

        public string? Description { get; set; }

        public int Quantity { get; set; }

        public decimal? WeightKg { get; set; }
    }
}