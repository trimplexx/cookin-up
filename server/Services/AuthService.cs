using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Context;
using server.Interfaces;
using server.Models.Db;
using server.Models.DTOs;

namespace server.Services;

public class AuthService : IAuthService
{
    private const int SaltSize = 16;
    private const int HashSize = 32;
    private const int HashIterations = 10000;
    private readonly IConfiguration _configuration;
    private readonly CookinUpDbContext _context;

    public AuthService(CookinUpDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<bool> Register(UserRegisterDto userRegisterDto)
    {
        if (string.IsNullOrWhiteSpace(userRegisterDto.Name) ||
            string.IsNullOrWhiteSpace(userRegisterDto.Email) ||
            string.IsNullOrWhiteSpace(userRegisterDto.Password))
            throw new ArgumentException("Wszystkie pola muszą być wypełnione.");

        var emailRegex = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
        if (!Regex.IsMatch(userRegisterDto.Email, emailRegex))
            throw new ArgumentException("Niepoprawny format emaila.");

        var passwordRegex = @"^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$";
        if (!Regex.IsMatch(userRegisterDto.Password, passwordRegex))
            throw new ArgumentException(
                "Hasło musi zawierać co najmniej 8 znaków, jedną wielką literę, jedną cyfrę i jeden znak specjalny.");

        if (await _context.Users.AnyAsync(u => u.Email == userRegisterDto.Email))
            throw new InvalidOperationException("Użytkownik z takim adresem email już istnieje");
        if (await _context.Users.AnyAsync(u => u.Name == userRegisterDto.Name))
            throw new InvalidOperationException("Użytkownik z takim nickiem już istnieje");

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

    public async Task<AuthResponseDto?> Login(UserLoginDto userLoginDto)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == userLoginDto.Email);
        if (user == null) return null;

        var passwordParts = user.Password.Split(':');
        var storedSalt = Convert.FromBase64String(passwordParts[0]);
        var storedHash = passwordParts[1];

        if (!VerifyPassword(userLoginDto.Password, storedHash, storedSalt)) return null;

        var accessToken = GenerateJwtToken(user);
        var refreshToken = GenerateRefreshToken();

        var expiredSessions = await _context.UserSessions
            .Where(us => us.UserId == user.Id && us.RefreshTokenExpiryTime < DateTime.UtcNow)
            .ToListAsync();
        _context.UserSessions.RemoveRange(expiredSessions);

        var newSession = new UserSession
        {
            UserId = user.Id,
            RefreshToken = refreshToken,
            RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7),
            CreatedAt = DateTime.UtcNow
        };

        await _context.UserSessions.AddAsync(newSession);
        await _context.SaveChangesAsync();

        return new AuthResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            UserName = user.Name
        };
    }

    public async Task<(string accessToken, string refreshToken)?> RefreshToken(string refreshToken,
        string accessToken)
    {
        var isRevoked =
            await _context.RevokedTokens.AnyAsync(rt => rt.Token == refreshToken || rt.Token == accessToken);
        if (isRevoked) return null;

        var userSession = await _context.UserSessions
            .Include(us => us.User)
            .SingleOrDefaultAsync(us => us.RefreshToken == refreshToken);

        if (userSession == null) return null;

        var jwtHandler = new JwtSecurityTokenHandler();
        try
        {
            var jwtKey = _configuration.GetSection("jwtKey").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!));

            jwtHandler.ValidateToken(accessToken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false,
                ClockSkew = TimeSpan.Zero
            }, out var validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;

            if (jwtToken.ValidTo > DateTime.UtcNow) return (accessToken, refreshToken);
        }
        catch (SecurityTokenException)
        {
            return null;
        }

        var newJwtToken = GenerateJwtToken(userSession.User);
        var newRefreshToken = GenerateRefreshToken();

        userSession.RefreshToken = newRefreshToken;
        userSession.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _context.SaveChangesAsync();

        return (newJwtToken, newRefreshToken);
    }


    public async Task Logout(string? accessToken, string? refreshToken)
    {
        var userSession = await _context.UserSessions.SingleOrDefaultAsync(us => us.RefreshToken == refreshToken);
        if (userSession != null) _context.UserSessions.Remove(userSession);

        var isRevokedAccessToken = await _context.RevokedTokens.AnyAsync(rt => rt.Token == accessToken);
        if (!isRevokedAccessToken && !string.IsNullOrEmpty(accessToken))
        {
            var revokedTokenJwt = new RevokedToken
            {
                Token = accessToken,
                RevokedAt = DateTime.UtcNow
            };
            await _context.RevokedTokens.AddAsync(revokedTokenJwt);
        }

        var isRevokedRefreshToken = await _context.RevokedTokens.AnyAsync(rt => rt.Token == refreshToken);
        if (!isRevokedRefreshToken && !string.IsNullOrEmpty(refreshToken))
        {
            var revokedTokenRefresh = new RevokedToken
            {
                Token = refreshToken,
                RevokedAt = DateTime.UtcNow
            };
            await _context.RevokedTokens.AddAsync(revokedTokenRefresh);
        }

        await _context.SaveChangesAsync();
    }

    private string GenerateRefreshToken()
    {
        var randomBytes = new byte[64];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
        }

        return Convert.ToBase64String(randomBytes);
    }


    private string GenerateJwtToken(Users user)
    {
        var claims = new[]
        {
            new Claim("Id", user.Id.ToString()),
            new Claim("Name", user.Name)
        };
        var jwtKey = _configuration.GetSection("jwtKey").Value;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddMinutes(15);

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