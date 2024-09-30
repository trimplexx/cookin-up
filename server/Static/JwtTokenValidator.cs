using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace server.Static
{
    public static class JwtTokenValidator
    {
        public static string secretKey { get; set; }
        public static bool ValidateToken(string token)
        {

            if (string.IsNullOrWhiteSpace(token))
            {
                return false;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Convert.FromBase64String(secretKey);

            // Konfiguracja weryfikacji tokenu
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };

            try
            {
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);
                return validatedToken != null;
            }
            catch
            {
                return false; // W przypadku błędu zwraca false
            }
        }
    }
}
