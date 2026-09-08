using CourierParcelTrackingSystem.API.Constants;
using CourierParcelTrackingSystem.API.DTOs.AuthDTO;
using CourierParcelTrackingSystem.API.Entities;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using CourierParcelTrackingSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CourierParcelTrackingSystem.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthService(
     IUserRepository userRepository,
     IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _passwordHasher = new PasswordHasher<User>();
        }

        private string GenerateJwtToken( User user, List<string> roles)
        {
            var claims = new List<Claim>
    {
        new Claim(
            ClaimTypes.NameIdentifier,
            user.UserId.ToString()
        ),

        new Claim(
            ClaimTypes.Name,
            user.UserName
        )
    };

            foreach (var role in roles)
            {
                claims.Add(
                    new Claim(
                        ClaimTypes.Role,
                        role
                    )
                );
            }

            if (user.Courier != null)
            {
                claims.Add(
                    new Claim(
                        "CourierId",
                        user.Courier.CourierId.ToString()
                    )
                );
            }

            if (user.CustomerId.HasValue)
            {
                claims.Add(
                    new Claim(
                        "CustomerId",
                        user.CustomerId.Value.ToString()
                    )
                );
            }

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"]!
                )
            );

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }

        public async Task<LoginResponseDto> LoginAsync(
            LoginRequestDto loginRequest)
        {
            try
            {
                var user = await _userRepository
                    .GetByEmailAsync(loginRequest.Email);

                if (user == null)
                {
                    return CreateFailedLoginResponse(
                        ErrorMessages.InvalidEmailOrPassword);
                }

                if (!user.IsActive)
                {
                    return CreateFailedLoginResponse(
                        ErrorMessages.UserAccountInactive);
                }

                if (user.IsDeleted)
                {
                    return CreateFailedLoginResponse(
                        ErrorMessages.UserAccountDeleted);
                }

                var passwordResult = _passwordHasher.VerifyHashedPassword(
                        user,
                        user.PasswordHash,
                        loginRequest.Password
                    );

                if (passwordResult == PasswordVerificationResult.Failed)
                {
                    return CreateFailedLoginResponse(
                        ErrorMessages.InvalidEmailOrPassword);
                }

                var roles = await _userRepository
                    .GetUserRolesAsync(user.UserId);

                var token = GenerateJwtToken(user, roles);

                return new LoginResponseDto
                {
                    Token = token,
                    UserId = user.UserId,
                    CourierId = user.Courier?.CourierId,
                    UserName = user.UserName,
                    Email = user.Email,
                    Roles = roles,
                    Success = true,
                    Message = ErrorMessages.LoginSuccessful
                };
            }
            catch (Exception ex)
            {
                throw new Exception(
                    ErrorMessages.LoginFailed,
                    ex);
            }
        }

        private LoginResponseDto CreateFailedLoginResponse(
            string message)
        {
            return new LoginResponseDto
            {
                Success = false,
                Message = message
            };
        }
    }
}
