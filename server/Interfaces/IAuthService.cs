using Microsoft.AspNetCore.Mvc;
using server.Models.DTOs;

namespace server.Interfaces;

public interface IAuthService
{
    Task<bool> Register(UserRegisterDto userRegisterDto);
    Task<(string accessToken, string refreshToken, string userName)?> Login(UserLoginDto userLoginDto);
    Task Logout(string? accessToken, string? refreshToken);
    Task<(string accessToken, string refreshToken)?> RefreshTokenAsync(string refreshToken, string accessToken);
}