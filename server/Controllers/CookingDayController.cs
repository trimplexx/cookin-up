using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Models.DTOs;
using server.Static;

namespace server.Controllers;

[Route("api/cookingDay")]
[ApiController]
public class CookingDayController(ICookingDayService cookingDayService) : ControllerBase
{
    [ServiceFilter(typeof(LobbyAuthorizationFilter))]
    [Authorize]
    [HttpGet("details/{cookingDayId}")]
    public async Task<IActionResult> GetCookingDayDetails(int cookingDayId)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var cookingDayDetails = await cookingDayService.GetCookingDayDetails(requestingUserId, cookingDayId);
            return Ok(cookingDayDetails);
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid("Brak uprawnień.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [ServiceFilter(typeof(LobbyAuthorizationFilter))]
    [Authorize]
    [HttpPut("update/{cookingDayId}")]
    public async Task<IActionResult> UpdateCookingDay(int cookingDayId, [FromBody] UpdateCookingDayRequestDto request)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var result = await cookingDayService.UpdateCookingDay(cookingDayId, request, requestingUserId);

            if (result)
                return Ok("Dzień gotowania został zaktualizowany.");
            return BadRequest("Aktualizacja dnia gotowania nie powiodła się.");
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid("Brak uprawnień.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}