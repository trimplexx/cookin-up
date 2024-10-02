using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using server.Context;

namespace server.Static;

public static class JwtTokenClass
{
    public static string secretKey;

    public static bool ValidateToken(string token, CookinUpDbContext context)
    {
        if (string.IsNullOrWhiteSpace(token)) return false;

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

        var isRevoked = context.RevokedTokens.Any(rt => rt.Token == token);
        if (isRevoked) return false;

        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };

        try
        {
            tokenHandler.ValidateToken(token, tokenValidationParameters, out _);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public static int ExtractUserIdFromToken(string token)
    {
        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token);

        var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "Id")?.Value;

        if (string.IsNullOrEmpty(userIdClaim)) throw new UnauthorizedAccessException();

        return int.Parse(userIdClaim);
    }
}