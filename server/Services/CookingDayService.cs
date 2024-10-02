using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Interfaces;
using server.Models.DTOs;
using server.Static;

namespace server.Services;

public class CookingDayService : ICookingDayService
{
    private readonly CookinUpDbContext _context;

    public CookingDayService(CookinUpDbContext context)
    {
        _context = context;
    }

    private async Task<bool> IsUserInLobby(int userId, int lobbyId)
    {
        return await _context.UsersInLobby
            .AnyAsync(ul => ul.UserId == userId && ul.LobbyId == lobbyId);
    }

    public async Task<List<CookingDayDto>> GetCookingDaysForLobby(int userId, int lobbyId)
    {
        var isUserInLobby = await IsUserInLobby(userId, lobbyId);
        if (!isUserInLobby)
            throw new UnauthorizedAccessException("Użytkownik nie ma dostępu do tego lobby.");

        var cookingDays = await _context.CookingDays
            .Where(cd => cd.LobbyId == lobbyId)
            .Select(cd => new CookingDayDto
            {
                Id = cd.Id,
                UserId = cd.UserId,
                LobbyId = cd.LobbyId,
                Date = cd.Date
            })
            .ToListAsync();

        return cookingDays;
    }

    public async Task<bool> UpdateCookingDayDate(int cookingDayId, DateTime newDate, int userId)
    {
        var cookingDay = await _context.CookingDays.FindAsync(cookingDayId);

        if (cookingDay == null)
            throw new ArgumentException("Podany CookingDay nie istnieje.");

        if (cookingDay.UserId != userId)
            throw new UnauthorizedAccessException("Nie masz uprawnień do zmiany tego dnia gotowania.");

        cookingDay.Date = newDate;
        await _context.SaveChangesAsync();

        return true;
    }
}