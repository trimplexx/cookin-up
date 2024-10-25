using server.Models.DTOs;

namespace server.Interfaces;

public interface ILobbyService
{
    #region Lobby

    Task<bool> CreateLobby(string lobbyName, int userId);
    Task<List<LobbyDto>> GetLobbiesForUser(int userId);
    Task<LobbyDetailsDto> GetLobbyDetails(int lobbyId, int userId);
    Task<bool> DeleteLobby(int lobbyId, int userId);

    #endregion

    #region UserList

    Task<bool> AddUserToLobby(AddRemoveFromLobbyDto lobbyDto, int requestingUserId);

    Task<bool> RemoveUserFromLobby(AddRemoveFromLobbyDto lobbyDto, int requestingUserId);

    #endregion

    #region CategoriesList

    Task AddCategoryToLobby(AddCategoryByNameDto categoryDto, int userId);
    Task<bool> RemoveCategory(RemoveCategoryDto removeCategoryDto, int requestingUserId);

    #endregion

    #region Blacklist

    Task<bool> AddItemToBlacklist(AddRemoveFromBlackListDto blackListDto, int requestingUserId);
    Task<bool> RemoveItemFromBlacklist(AddRemoveFromBlackListDto blackListDto, int requestingUserId);

    #endregion
}