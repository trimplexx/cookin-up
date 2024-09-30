using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Context;
using server.Interfaces;
using server.Models.Db;
using server.Models.DTOs;
using server.Static;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace server.Services
{
    public class UserService : IUserService
    {
        private readonly CookinUpDbContext _context;

        public UserService(CookinUpDbContext context)
        {
            _context = context;
        }

        // Rejestracja użytkownika
        public async Task<bool> Register(UserRegisterDto userRegisterDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == userRegisterDto.Email))
            {
                return false;
            }

            var user = new Users
            {
                Name = userRegisterDto.Name,
                Email = userRegisterDto.Email,
                Password = HashPassword(userRegisterDto.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;
        }

        // Logowanie użytkownika
        public async Task<string?> Login(UserLoginDto userLoginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == userLoginDto.Email);

            if (user == null || !VerifyPassword(userLoginDto.Password, user.Password))
            {
                return null;
            }

            // Tworzenie tokenu JWT
            var token = GenerateJwtToken(user);
            return token;
        }

        private string GenerateJwtToken(Users user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtTokenValidator.secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: null,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Hashowanie hasła
        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        // Weryfikacja hasła
        private bool VerifyPassword(string enteredPassword, string storedPassword)
        {
            var hashedEnteredPassword = HashPassword(enteredPassword);
            return hashedEnteredPassword == storedPassword;
        }
    }
}
