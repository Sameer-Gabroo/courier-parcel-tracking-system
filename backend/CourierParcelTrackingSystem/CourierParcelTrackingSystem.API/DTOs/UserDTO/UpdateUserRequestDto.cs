namespace CourierParcelTrackingSystem.API.DTOs.UserDTO
{
    public class UpdateUserRequestDto
    {
        public string? Password { get; set; }

        public int? RoleId { get; set; }

        public bool IsActive { get; set; }
    }
}