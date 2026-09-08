namespace CourierParcelTrackingSystem.API.DTOs.AuthDTO
{
    public class LoginResponseDto
    {
        public string Token { get; set; } = null!;

        public int UserId { get; set; }

        public int? CourierId { get; set; }

        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public List<string> Roles { get; set; } = new();

        public bool Success { get; set; }

        public string Message { get; set; } = null!;
    }


}
