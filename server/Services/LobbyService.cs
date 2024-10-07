using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Interfaces;
using server.Models.Db;
using server.Models.DTOs;
using server.Static;

namespace server.Services;

public class LobbyService : ILobbyService
{
    private readonly CookinUpDbContext _context;

    public LobbyService(CookinUpDbContext context)
    {
        _context = context;
    }

    public async Task<bool> CreateLobby(string lobbyName, int userId)
    {
        if (string.IsNullOrWhiteSpace(lobbyName))
            throw new ArgumentException("Nazwa lobby nie może być pusta");

        if (lobbyName.Length > 255)
            throw new ArgumentException("Maksymalna długość nazwy to 255 znaków");

        var existingLobby = await _context.Lobbies
            .FirstOrDefaultAsync(l => l.Name == lobbyName && l.CreatedByUserId == userId);

        if (existingLobby != null)
            throw new InvalidOperationException("Lobby o tej nazwie zostało już utworzone");

        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                var lobby = new Lobby
                {
                    Name = lobbyName,
                    CreatedByUserId = userId
                };

                _context.Lobbies.Add(lobby);
                await _context.SaveChangesAsync();

                var cookingDay = new CookingDay
                {
                    UserId = userId,
                    LobbyId = lobby.Id
                };

                _context.CookingDays.Add(cookingDay);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return true;
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw new Exception("Wystąpił błąd podczas tworzenia lobby lub CookingDay.");
            }
        }
    }

    public async Task<LobbyDetailsDto> GetLobbyDetails(int lobbyId, int userId)
    {
        var lobby = await _context.Lobbies
            .Include(l => l.UsersInLobbies)
            .Include(l => l.Blacklists)
            .FirstOrDefaultAsync(l => l.Id == lobbyId);

        if (lobby == null)
            throw new ArgumentException("Podane lobby nie istnieje.");

        var isUserInLobby = await _context.UsersInLobby
            .AnyAsync(ul => ul.UserId == userId && ul.LobbyId == lobbyId);

        if (!isUserInLobby && lobby.CreatedByUserId != userId)
            throw new UnauthorizedAccessException("Nie masz dostępu do tego lobby.");

        var usersInLobby = await _context.UsersInLobby
            .Where(ul => ul.LobbyId == lobbyId)
            .Select(ul => new UserDto
            {
                UserId = ul.User.Id,
                UserName = ul.User.Name
            })
            .ToListAsync();

        var blacklist = await _context.Blacklist
            .Where(b => b.LobbyId == lobbyId)
            .Select(b => new BlacklistDto
            {
                Id = b.Id,
                Name = b.Name
            })
            .ToListAsync();

        return new LobbyDetailsDto
        {
            LobbyId = lobby.Id,
            Name = lobby.Name,
            Users = usersInLobby,
            Blacklist = blacklist
        };
    }

    public async Task<List<LobbyDto>> GetLobbiesForUser(int userId)
    {
        var createdLobbies = await _context.Lobbies
            .Where(l => l.CreatedByUserId == userId)
            .Select(l => new LobbyDto
            {
                Id = l.Id,
                Name = l.Name,
                PlayersCount = l.UsersInLobbies.Count()
            })
            .ToListAsync();

        var joinedLobbies = await _context.UsersInLobby
            .Where(ul => ul.UserId == userId)
            .Select(ul => new LobbyDto
            {
                Id = ul.Lobby.Id,
                Name = ul.Lobby.Name,
                PlayersCount = ul.Lobby.UsersInLobbies.Count()
            })
            .ToListAsync();

        var allLobbies = createdLobbies.Union(joinedLobbies).ToList();

        return allLobbies;
    }


    public async Task<bool> AddUserToLobby(int userId, int lobbyId)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                var lobby = await _context.Lobbies.FindAsync(lobbyId);
                if (lobby == null) throw new ArgumentException("Podane lobby nie istnieje.");

                var isUserInLobby = await _context.UsersInLobby
                    .AnyAsync(ul => ul.UserId == userId && ul.LobbyId == lobbyId);

                if (isUserInLobby) throw new InvalidOperationException("Użytkownik już znajduje się w tym lobby.");

                if (lobby.CreatedByUserId != userId)
                    throw new UnauthorizedAccessException("Nie masz uprawnień do usunięcia tego lobby.");

                var userInLobby = new UsersInLobby
                {
                    UserId = userId,
                    LobbyId = lobbyId
                };

                _context.UsersInLobby.Add(userInLobby);
                await _context.SaveChangesAsync();

                var cookingDay = new CookingDay
                {
                    UserId = userId,
                    LobbyId = lobby.Id
                };

                _context.CookingDays.Add(cookingDay);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return true;
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }

    public async Task<bool> DeleteLobby(int lobbyId, int userId)
    {
        var lobby = await _context.Lobbies.FindAsync(lobbyId);
        if (lobby == null)
            throw new ArgumentException("Podane lobby nie istnieje.");

        if (lobby.CreatedByUserId != userId)
            throw new UnauthorizedAccessException("Nie masz uprawnień do usunięcia tego lobby.");

        _context.Lobbies.Remove(lobby);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> RemoveUserFromLobby(int userId, int lobbyId, int requestingUserId)
    {
        var lobby = await _context.Lobbies.FindAsync(lobbyId);
        if (lobby == null)
            throw new ArgumentException("Podane lobby nie istnieje.");

        if (lobby.CreatedByUserId != requestingUserId)
            throw new UnauthorizedAccessException("Nie masz uprawnień do usunięcia użytkownika z tego lobby.");

        var userInLobby = await _context.UsersInLobby
            .FirstOrDefaultAsync(ul => ul.UserId == userId && ul.LobbyId == lobbyId);

        if (userInLobby == null)
            throw new ArgumentException("Użytkownik nie jest w tym lobby.");

        _context.UsersInLobby.Remove(userInLobby);
        await _context.SaveChangesAsync();

        return true;
    }
}