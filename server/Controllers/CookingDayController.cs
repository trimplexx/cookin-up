using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Context;
using server.Interfaces;
using server.Static;

namespace server.Controllers;

[Route("api/cookingDay")]
[ApiController]
public class CookingDayController : ControllerBase
{
    private readonly ICookingDayService _cookingDayService;
    private readonly CookinUpDbContext _context;

    public CookingDayController(ICookingDayService cookingDayService, CookinUpDbContext context)
    {
        _cookingDayService = cookingDayService;
        _context = context;
    }

    [Authorize]
    [HttpGet("{lobbyId}")]
    public async Task<IActionResult> GetCookingDaysForLobby(int lobbyId)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var cookingDays = await _cookingDayService.GetCookingDaysForLobby(requestingUserId, lobbyId);
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
            var result = await _cookingDayService.UpdateCookingDayDate(cookingDayId, newDate, requestingUserId);
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