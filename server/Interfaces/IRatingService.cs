using server.Models.DTOs;

namespace server.Interfaces;

public interface IRatingService
{
    Task<bool> RateCategory(RateCategoryRequestDto rateCategoryRequest, int requestingUserId);
    Task<LobbyRatingsSummaryDto> GetLobbyRatingsSummary(int lobbyId);
}