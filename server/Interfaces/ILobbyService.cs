using server.Models.DTOs;

namespace server.Interfaces;

public interface ILobbyService
{
    Task<bool> CreateLobby(string lobbyName, int userId);
    Task<List<LobbyDto>> GetLobbiesForUser(int userId);
    Task<LobbyDetailsDto> GetLobbyDetails(int lobbyId, int userId);
    Task<bool> AddUserToLobby(int userId, int lobbyId);
    Task<bool> DeleteLobby(int lobbyId, int userId);
    Task<bool> RemoveUserFromLobby(int userId, int lobbyId, int requestingUserId);
}