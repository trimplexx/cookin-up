using server.Models.DTOs;

namespace server.Interfaces;

public interface ILobbyService
{
    Task<bool> CreateLobby(string lobbyName, int userId);
    Task<List<LobbyDto>> GetLobbiesForUser(int userId);
    Task<LobbyDetailsDto> GetLobbyDetails(int lobbyId, int userId);
    Task<bool> AddUserToLobby(AddRemoveFromLobbyDto lobbyDto, int requestingUserId);
    Task<bool> DeleteLobby(int lobbyId, int userId);
    Task<bool> RemoveUserFromLobby(AddRemoveFromLobbyDto lobbyDto, int requestingUserId);
    Task<bool> AddItemToBlacklist(AddRemoveFromBlackListDto blackListDto, int requestingUserId);
    Task<bool> RemoveItemFromBlacklist(AddRemoveFromBlackListDto blackListDto, int requestingUserId);
}