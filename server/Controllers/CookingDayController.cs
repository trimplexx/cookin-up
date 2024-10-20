using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;

namespace server.Controllers;

[Route("api/cookingDay")]
[ApiController]
public class CookingDayController(ICookingDayService cookingDayService) : ControllerBase
{
    [Authorize]
    [HttpGet("{lobbyId}")]
    public async Task<IActionResult> GetCookingDaysForLobby(int lobbyId)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var cookingDays = await cookingDayService.GetCookingDaysForLobby(requestingUserId, lobbyId);
            return Ok(cookingDays);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("date")]
    public async Task<IActionResult> UpdateCookingDayDate(int cookingDayId, DateTime newDate)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var result = await cookingDayService.UpdateCookingDayDate(cookingDayId, newDate, requestingUserId);
            if (result)
                return Ok("Data została zaktualizowana.");
            return BadRequest("Nie udało się zaktualizować daty.");
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}