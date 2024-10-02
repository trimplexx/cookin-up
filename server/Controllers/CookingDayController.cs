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

    [HttpGet("{lobbyId}")]
    public async Task<IActionResult> GetCookingDaysForLobby([FromHeader] string token, int lobbyId)
    {
        try
        {
            if (!JwtTokenClass.ValidateToken(token, _context)) return Unauthorized();
            var userId = JwtTokenClass.ExtractUserIdFromToken(token);

            var cookingDays = await _cookingDayService.GetCookingDaysForLobby(userId, lobbyId);
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


    [HttpPost("date")]
    public async Task<IActionResult> UpdateCookingDayDate([FromHeader] string token, int cookingDayId, DateTime newDate)
    {
        try
        {
            if (!JwtTokenClass.ValidateToken(token, _context)) return Unauthorized();
            var userId = JwtTokenClass.ExtractUserIdFromToken(token);
            var result = await _cookingDayService.UpdateCookingDayDate(cookingDayId, newDate, userId);
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