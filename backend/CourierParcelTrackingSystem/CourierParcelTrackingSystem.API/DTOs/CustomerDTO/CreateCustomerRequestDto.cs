namespace CourierParcelTrackingSystem.API.DTOs
{
    public class CreateCustomerRequestDto
    {
        // Customer table
        //public string CustomerCode { get; set; } = null!;

        public string CustomerName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public bool IsActive { get; set; }

        // CustomerDetail table
        public string? Phone { get; set; }

        public string? Address { get; set; }

        public string? City { get; set; }

        public string? PostalCode { get; set; }
    }
}