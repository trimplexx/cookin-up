using Microsoft.AspNetCore.Mvc;
using server.Models.DTOs;

namespace server.Interfaces;

public interface IAuthService
{
    Task<bool> Register(UserRegisterDto userRegisterDto);
    Task<AuthResponseDto?> Login(UserLoginDto userLoginDto);
    Task Logout(string? accessToken, string? refreshToken);
    Task<(string accessToken, string refreshToken)?> RefreshToken(string refreshToken, string accessToken);
}