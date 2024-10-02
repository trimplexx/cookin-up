using Microsoft.AspNetCore.Mvc;
using server.Context;
using server.Interfaces;
using server.Models.DTOs;
using server.Static;

namespace server.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly CookinUpDbContext _context;

    public UserController(IUserService userService, CookinUpDbContext context)
    {
        _userService = userService;
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegisterDto userRegisterDto)
    {
        var result = await _userService.Register(userRegisterDto);
        if (!result) return BadRequest("Użytkownik z takim emailem już istnieje.");
        return Ok("Rejestracja powiodła się.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto userLoginDto)
    {
        var token = await _userService.Login(userLoginDto);
        if (token == null) return Unauthorized("Nieprawidłowe dane logowania.");
        return Ok(token);
    }

    [HttpHead("tokenVerify")]
    public IActionResult TokenVerify([FromHeader] string jwtToken)
    {
        if (JwtTokenClass.ValidateToken(jwtToken, _context)) return Ok();
        return Unauthorized();
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromHeader] string token)
    {
        var result = await _userService.Logout(token);
        if (!result) return BadRequest("Wylogowanie nie powiodło się lub token jest niepoprawny.");
        return Ok("Wylogowanie powiodło się.");
    }
}