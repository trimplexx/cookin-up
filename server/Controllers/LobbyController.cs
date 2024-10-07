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

    [HttpPut("create/{name}")]
    public async Task<IActionResult> CreateLobby([FromHeader] string token, string name)
    {
        try
        {
            if (!JwtTokenClass.ValidateToken(token, _context)) return Unauthorized();
            var userId = JwtTokenClass.ExtractUserIdFromToken(token);
            await _lobbyService.CreateLobby(name, userId);
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

    [HttpGet]
    public async Task<IActionResult> GetLobbiesForUser([FromHeader] string token)
    {
        try
        {
            if (!JwtTokenClass.ValidateToken(token, _context)) return Unauthorized();
            var userId = JwtTokenClass.ExtractUserIdFromToken(token);
            var lobbies = await _lobbyService.GetLobbiesForUser(userId);
            return Ok(lobbies);
        }
        catch (Exception)
        {
            return StatusCode(500, "Wystąpił błąd wczytywania lobby");
        }
    }

    [HttpPost("addUser")]
    public async Task<IActionResult> AddUserToLobby([FromHeader] string token, int lobbyId, int userId)
    {
        try
        {
            if (!JwtTokenClass.ValidateToken(token, _context)) return Unauthorized();
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

    [HttpDelete("{lobbyId}")]
    public async Task<IActionResult> DeleteLobby([FromHeader] string token, int lobbyId)
    {
        try
        {
            if (!JwtTokenClass.ValidateToken(token, _context)) return Unauthorized();
            var userId = JwtTokenClass.ExtractUserIdFromToken(token);
            var result = await _lobbyService.DeleteLobby(lobbyId, userId);
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

    [HttpDelete("user")]
    public async Task<IActionResult> RemoveUserFromLobby([FromHeader] string token, int lobbyId, int userId)
    {
        try
        {
            if (!JwtTokenClass.ValidateToken(token, _context)) return Unauthorized();
            var requestingUserId = JwtTokenClass.ExtractUserIdFromToken(token);
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