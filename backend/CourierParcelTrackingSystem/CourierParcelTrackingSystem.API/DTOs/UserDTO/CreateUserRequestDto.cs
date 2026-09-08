namespace CourierParcelTrackingSystem.API.DTOs
{
    public class CreateUserRequestDto
    {
        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public string? City { get; set; }

        public int RoleId { get; set; }

        public bool IsActive { get; set; }

        public string? EmergencyContact { get; set; }

        public string? EmergencyPhone { get; set; }
    }
}
