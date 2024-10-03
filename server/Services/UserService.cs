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
using System.Text.RegularExpressions;

namespace server.Services;

public class UserService : IUserService
{
    private readonly CookinUpDbContext _context;
    private const int SaltSize = 16;
    private const int HashSize = 32;
    private const int HashIterations = 10000;

    public UserService(CookinUpDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Register(UserRegisterDto userRegisterDto)
    {
        if (string.IsNullOrWhiteSpace(userRegisterDto.Name) || 
            string.IsNullOrWhiteSpace(userRegisterDto.Email) || 
            string.IsNullOrWhiteSpace(userRegisterDto.Password))
        {
            throw new ArgumentException("Wszystkie pola muszą być wypełnione.");
        }
        
        var emailRegex = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
        if (!Regex.IsMatch(userRegisterDto.Email, emailRegex))
        {
            throw new ArgumentException("Niepoprawny format emaila.");
        }
        
        var passwordRegex = @"^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$";
        if (!Regex.IsMatch(userRegisterDto.Password, passwordRegex))
        {
            throw new ArgumentException("Hasło musi zawierać co najmniej 8 znaków, jedną wielką literę, jedną cyfrę i jeden znak specjalny.");
        }
        
        if (await _context.Users.AnyAsync(u => u.Email == userRegisterDto.Email))
        {
            return false;
        }
        
        var salt = GenerateSalt();
        var hashedPassword = HashPassword(userRegisterDto.Password, salt);
        
        var user = new Users
        {
            Name = userRegisterDto.Name,
            Email = userRegisterDto.Email,
            Password = $"{Convert.ToBase64String(salt)}:{hashedPassword}"
        };
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return true;
    }



    public async Task<string?> Login(UserLoginDto userLoginDto)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == userLoginDto.Email);

        if (user == null) return null;

        var passwordParts = user.Password.Split(':');
        var storedSalt = Convert.FromBase64String(passwordParts[0]);
        var storedHash = passwordParts[1];

        if (!VerifyPassword(userLoginDto.Password, storedHash, storedSalt)) return null;

        var token = GenerateJwtToken(user);
        return token;
    }

    public async Task<bool> Logout(string token)
    {
        if (!JwtTokenClass.ValidateToken(token, _context)) return false;

        var revokedToken = new RevokedToken
        {
            Token = token,
            RevokedAt = DateTime.UtcNow
        };

        _context.RevokedTokens.Add(revokedToken);
        await _context.SaveChangesAsync();

        return true;
    }

    private string GenerateJwtToken(Users user)
    {
        var claims = new[]
        {
            new Claim("Id", user.Id.ToString()),
            new Claim("Name", user.Name)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtTokenClass.SecretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddDays(7);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: expires,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private byte[] GenerateSalt()
    {
        var salt = new byte[SaltSize];
        RandomNumberGenerator.Fill(salt);
        return salt;
    }

    private string HashPassword(string password, byte[] salt, int iterations = HashIterations,
        int hashByteSize = HashSize)
    {
        using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterations, HashAlgorithmName.SHA256);
        var hash = pbkdf2.GetBytes(hashByteSize);
        return Convert.ToBase64String(hash);
    }

    private bool VerifyPassword(string enteredPassword, string storedHash, byte[] storedSalt)
    {
        var hashedEnteredPassword = HashPassword(enteredPassword, storedSalt);

        return hashedEnteredPassword == storedHash;
    }
}