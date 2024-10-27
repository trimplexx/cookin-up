using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Models.DTOs;
using server.Static;

namespace server.Controllers;

[Route("api/rating")]
[ApiController]
public class RatingController : ControllerBase
{
    private readonly IRatingService _ratingService;

    public RatingController(IRatingService ratingService)
    {
        _ratingService = ratingService;
    }

    [ServiceFilter(typeof(LobbyAuthorizationFilter))]
    [Authorize]
    [HttpPost("rateCategory")]
    public async Task<IActionResult> RateCategory([FromBody] RateCategoryRequestDto rateCategoryRequest)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var result = await _ratingService.RateCategory(rateCategoryRequest, requestingUserId);

            if (result)
                return Ok("Ocena kategorii została zapisana pomyślnie.");
            return BadRequest("Nie udało się zapisać oceny kategorii.");
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid("Brak uprawnień.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Wystąpił błąd serwera. Proszę spróbować ponownie później.");
        }
    }

    [ServiceFilter(typeof(LobbyAuthorizationFilter))]
    [Authorize]
    [HttpGet("summary/{lobbyId}")]
    public async Task<IActionResult> GetLobbyRatingsSummary(int lobbyId)
    {
        try
        {
            var summary = await _ratingService.GetLobbyRatingsSummary(lobbyId);
            return Ok(summary);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Wystąpił błąd serwera. Proszę spróbować ponownie później.");
        }
    }
}