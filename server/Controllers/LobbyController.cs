using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Context;
using server.Interfaces;
using server.Static;

namespace server.Controllers;

[Route("api/lobby")]
[ApiController]
public class LobbyController : ControllerBase
{
    private readonly ILobbyService _lobbyService;
    private readonly CookinUpDbContext _context;

    public LobbyController(ILobbyService lobbyService, CookinUpDbContext context)
    {
        _lobbyService = lobbyService;
        _context = context;
    }

    [Authorize]
    [HttpPut("create/{name}")]
    public async Task<IActionResult> CreateLobby(string name)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            await _lobbyService.CreateLobby(name, requestingUserId);
            return Ok();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "Wystąpił błąd tworzenia lobby");
        }
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetLobbiesForUser()
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var lobbies = await _lobbyService.GetLobbiesForUser(requestingUserId);
            return Ok(lobbies);
        }
        catch (Exception)
        {
            return StatusCode(500, "Wystąpił błąd wczytywania lobby");
        }
    }

    [Authorize]
    [HttpGet("{lobbyId}/details")]
    public async Task<IActionResult> GetLobbyDetails(int lobbyId)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var lobbyDetails = await _lobbyService.GetLobbyDetails(lobbyId, requestingUserId);
            return Ok(lobbyDetails);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "Wystąpił błąd podczas pobierania szczegółów lobby.");
        }
    }

    [Authorize]
    [HttpPost("addUser")]
    public async Task<IActionResult> AddUserToLobby(int lobbyId, int userId)
    {
        try
        {
            await _lobbyService.AddUserToLobby(userId, lobbyId);
            return Ok("Użytkownik został dodany do lobby.");
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ex.Message);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "Wystąpił błąd podczas dodawania użytkownika do lobby.");
        }
    }

    [Authorize]
    [HttpDelete("{lobbyId}")]
    public async Task<IActionResult> DeleteLobby(int lobbyId)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var result = await _lobbyService.DeleteLobby(lobbyId, requestingUserId);
            if (result)
                return Ok("Lobby zostało usunięte.");
            return BadRequest("Nie udało się usunąć lobby.");
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "Wystąpił błąd podczas usuwania lobby.");
        }
    }

    [Authorize]
    [HttpDelete("user")]
    public async Task<IActionResult> RemoveUserFromLobby(int lobbyId, int userId)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());

            var result = await _lobbyService.RemoveUserFromLobby(userId, lobbyId, requestingUserId);
            if (result)
                return Ok("Użytkownik został usunięty z lobby.");

            return BadRequest("Nie udało się usunąć użytkownika.");
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "Wystąpił błąd podczas usuwania użytkownika z lobby.");
        }
    }
}