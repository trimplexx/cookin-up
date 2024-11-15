using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;

namespace server.Controllers;

[ApiController]
[Route("api/user")]
public class UserController(IUserService userService) : ControllerBase
{
    [Authorize]
    [HttpGet("name")]
    public async Task<IActionResult> GetUserName()
    {
        var userIdClaim = User.FindFirst("Id");
        if (userIdClaim == null) return Unauthorized("Nie udało się znaleźć ID użytkownika w tokenie.");

        var userId = int.Parse(userIdClaim.Value);
        var userName = await userService.GetUserNameById(userId);

        if (userName == null) return NotFound("Użytkownik nie został znaleziony.");

        return Ok(userName);
    }
}