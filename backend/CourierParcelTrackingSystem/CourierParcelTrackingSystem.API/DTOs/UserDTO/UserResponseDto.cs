namespace CourierParcelTrackingSystem.API.DTOs
{
    public class UserResponseDto
    {
        public int UserId { get; set; }

        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public bool IsActive { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public int RoleId { get; set; }
        public string? City { get; set; }

        public List<string> Roles { get; set; } = new List<string>();
    }
}
