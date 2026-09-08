namespace CourierParcelTrackingSystem.API.DTOs
{
    public class UpdateHubRequestDto
    {
        //public string HubCode { get; set; } = null!;

        public string HubName { get; set; } = null!;

        public string City { get; set; } = null!;

        public string? Address { get; set; }

        public string? Phone { get; set; }

        public bool IsActive { get; set; }
    }
}