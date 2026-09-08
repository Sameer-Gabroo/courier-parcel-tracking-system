namespace CourierParcelTrackingSystem.API.DTOs
{
    public class AssignParcelRequestDto
    {
        public int CourierId { get; set; }

        public string? Remarks { get; set; }
    }
}