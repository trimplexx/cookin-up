using server.Models.DTOs;

namespace server.Interfaces;

public interface ICookingDayService
{
    Task<bool> UpdateCookingDay(int cookingDayId, UpdateCookingDayRequestDto request, int userId);
    Task<CookingDayDetailsDto> GetCookingDayDetails(int userId, int cookingDayId);
}