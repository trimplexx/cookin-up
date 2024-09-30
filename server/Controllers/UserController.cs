using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Models.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // Endpoint do rejestracji
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto userRegisterDto)
        {
            var result = await _userService.Register(userRegisterDto);
            if (!result)
            {
                return BadRequest("Użytkownik z takim emailem już istnieje.");
            }
            return Ok("Rejestracja powiodła się.");
        }

        // Endpoint do logowania
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        {
            var token = await _userService.Login(userLoginDto);
            if (token == null)
            {
                return Unauthorized("Nieprawidłowe dane logowania.");
            }
            return Ok(token);
        }
    }
}
