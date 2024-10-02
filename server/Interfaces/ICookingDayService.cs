using server.Models.DTOs;

namespace server.Interfaces;

public interface ICookingDayService
{
    Task<List<CookingDayDto>> GetCookingDaysForLobby(int userId, int lobbyId);
    Task<bool> UpdateCookingDayDate(int cookingDayId, DateTime newDate, int userId);
}