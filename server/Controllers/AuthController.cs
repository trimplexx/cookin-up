using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Interfaces;
using server.Models.DTOs;
using server.Static;

namespace server.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegisterDto userRegisterDto)
    {
        try
        {
            var result = await _authService.Register(userRegisterDto);
            if (!result) return Conflict("Użytkownik z takim emailem już istnieje.");
            return Ok("Rejestracja powiodła się.");
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Wystąpił błąd serwera: {ex.Message}");
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto userLoginDto)
    {
        var result = await _authService.Login(userLoginDto);

        if (result == null) return Unauthorized("Nieprawidłowe dane logowania.");

        Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Lax,
            Secure = Request.IsHttps,
            Expires = DateTime.UtcNow.AddDays(7)
        });

        return Ok(new { result.AccessToken, result.RefreshToken });
    }


    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken()
    {
        if (Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
        {
            var authorizationHeader = Request.Headers["Authorization"].ToString();

            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
                return BadRequest("Brak access tokenu");

            var accessToken = authorizationHeader.Substring("Bearer ".Length).Trim();

            var tokens = await _authService.RefreshToken(refreshToken, accessToken);
            if (tokens == null) return BadRequest("Błąd generowania nowych tokenów");

            Response.Cookies.Append("refreshToken", tokens.Value.refreshToken, new CookieOptions
            {
                HttpOnly = true,
                SameSite = ServiceRegistration.isDev ? SameSiteMode.None : SameSiteMode.Lax,
                Secure = !ServiceRegistration.isDev,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return Ok(new { accessToken = tokens.Value.accessToken });
        }

        return BadRequest("Brak refreshTokenu");
    }


    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
            return BadRequest("Brak refreshToken w ciasteczkach.");

        Response.Cookies.Delete("refreshToken");

        var accessToken = "";
        var authorizationHeader = Request.Headers["Authorization"].ToString();
        if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
            accessToken = authorizationHeader.Substring("Bearer ".Length).Trim();

        await _authService.Logout(accessToken, refreshToken);

        return Ok("Wylogowanie powiodło się.");
    }
}