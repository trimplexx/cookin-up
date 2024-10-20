using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Models.DTOs;

namespace server.Controllers;

[Route("api/lobby")]
[ApiController]
public class LobbyController(ILobbyService lobbyService) : ControllerBase
{
    [Authorize]
    [HttpPut("create/{name}")]
    public async Task<IActionResult> CreateLobby(string name)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            await lobbyService.CreateLobby(name, requestingUserId);
            return Ok();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "Wystąpił błąd tworzenia lobbyDto");
        }
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetLobbiesForUser()
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var lobbies = await lobbyService.GetLobbiesForUser(requestingUserId);
            return Ok(lobbies);
        }
        catch (Exception)
        {
            return StatusCode(500, "Wystąpił błąd wczytywania lobbyDto");
        }
    }

    [Authorize]
    [HttpGet("{lobbyId}/details")]
    public async Task<IActionResult> GetLobbyDetails(int lobbyId)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var lobbyDetails = await lobbyService.GetLobbyDetails(lobbyId, requestingUserId);
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
            return StatusCode(500, "Wystąpił błąd podczas pobierania szczegółów lobbyDto.");
        }
    }

    [Authorize]
    [HttpPost("addUser")]
    public async Task<IActionResult> AddUserToLobby(AddRemoveFromLobbyDto lobbyDto)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            await lobbyService.AddUserToLobby(lobbyDto, requestingUserId);
            return Ok("Użytkownik został dodany do lobbyDto.");
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
            return StatusCode(500, "Wystąpił błąd podczas dodawania użytkownika do lobbyDto.");
        }
    }

    [Authorize]
    [HttpPost("addItemToBlacklist")]
    public async Task<IActionResult> AddItemToBlacklist(AddRemoveFromBlackListDto blackListDto)
    {
        try
        {
            var requestingUserId =
                int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());

            await lobbyService.AddItemToBlacklist(blackListDto, requestingUserId);
            return Ok("Przedmiot został dodany.");
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
            return StatusCode(500, "Wystąpił błąd podczas dodawania użytkownika do lobbyDto.");
        }
    }

    [Authorize]
    [HttpDelete("itemFromBlacklist")]
    public async Task<IActionResult> RemoveItemFromBlacklist(AddRemoveFromBlackListDto blackListDto)
    {
        try
        {
            var requestingUserId = int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var result = await lobbyService.RemoveItemFromBlacklist(blackListDto, requestingUserId);

            if (result)
                return Ok("Przedmiot został usunięty z czarnej listy.");

            return BadRequest("Nie udało się usunąć przedmiotu z czarnej listy.");
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
            return StatusCode(500, "Wystąpił błąd podczas usuwania przedmiotu z czarnej listy.");
        }
    }

    [Authorize]
    [HttpDelete("{lobbyId}")]
    public async Task<IActionResult> DeleteLobby(int lobbyId)
    {
        try
        {
            var requestingUserId =
                int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());
            var result = await lobbyService.DeleteLobby(lobbyId, requestingUserId);
            if (result)
                return Ok("Lobby zostało usunięte.");
            return BadRequest("Nie udało się usunąć lobbyDto.");
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
            return StatusCode(500, "Wystąpił błąd podczas usuwania lobbyDto.");
        }
    }

    [Authorize]
    [HttpDelete("userFromLobby")]
    public async Task<IActionResult> RemoveUserFromLobby(AddRemoveFromLobbyDto lobbyDto)
    {
        try
        {
            var requestingUserId =
                int.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException());

            var result = await lobbyService.RemoveUserFromLobby(lobbyDto, requestingUserId);
            if (result)
                return Ok("Użytkownik został usunięty z lobbyDto.");

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
            return StatusCode(500, "Wystąpił błąd podczas usuwania użytkownika z lobbyDto.");
        }
    }
}