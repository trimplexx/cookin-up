using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Interfaces;
using server.Models.Db;
using server.Models.DTOs;

namespace server.Services;

public class LobbyService(CookinUpDbContext context) : ILobbyService
{
    #region Lobby

    public async Task<bool> CreateLobby(string lobbyName, int userId)
    {
        if (string.IsNullOrWhiteSpace(lobbyName))
            throw new ArgumentException("Nazwa lobbyDto nie może być pusta");

        if (lobbyName.Length > 255)
            throw new ArgumentException("Maksymalna długość nazwy to 255 znaków");

        var existingLobby = await context.Lobbies
            .FirstOrDefaultAsync(l => l.Name == lobbyName && l.CreatedByUserId == userId);

        if (existingLobby != null)
            throw new InvalidOperationException("Lobby o tej nazwie zostało już utworzone");

        using (var transaction = await context.Database.BeginTransactionAsync())
        {
            try
            {
                var lobby = new Lobby
                {
                    Name = lobbyName,
                    CreatedByUserId = userId
                };

                context.Lobbies.Add(lobby);
                await context.SaveChangesAsync();

                var cookingDay = new CookingDay
                {
                    UserId = userId,
                    LobbyId = lobby.Id
                };

                context.CookingDays.Add(cookingDay);
                await context.SaveChangesAsync();

                await transaction.CommitAsync();

                return true;
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw new Exception("Wystąpił błąd podczas tworzenia lobbyDto lub CookingDay.");
            }
        }
    }

    public async Task<LobbyDetailsDto> GetLobbyDetails(int lobbyId, int userId)
    {
        var lobby = await context.Lobbies
            .Include(l => l.UsersInLobbies)
            .Include(l => l.Blacklists)
            .FirstOrDefaultAsync(l => l.Id == lobbyId);

        if (lobby == null)
            throw new ArgumentException("Podane lobby nie istnieje.");

        var isUserInLobby = await context.UsersInLobby
            .AnyAsync(ul => ul.UserId == userId && ul.LobbyId == lobbyId);

        if (!isUserInLobby && lobby.CreatedByUserId != userId)
            throw new UnauthorizedAccessException("Nie masz dostępu do tego lobby.");

        var isOwner = lobby.CreatedByUserId == userId;

        var usersInLobby = await context.UsersInLobby
            .Where(ul => ul.LobbyId == lobbyId)
            .Select(ul => new UserDto
            {
                UserId = ul.User.Id,
                UserName = ul.User.Name
            })
            .ToListAsync();

        var blacklist = await context.Blacklist
            .Where(b => b.LobbyId == lobbyId)
            .Select(b => new BlacklistDto
            {
                Id = b.Id,
                Name = b.Name
            })
            .ToListAsync();

        var otherCategories = await context.OtherCategories
            .Where(oc => oc.LobbyId == lobbyId)
            .Select(oc => new OtherCategories
            {
                Id = oc.Id,
                Name = oc.Name
            })
            .ToListAsync();

        var mealCategories = await context.MealCategories
            .Where(mc => mc.LobbyId == lobbyId)
            .Select(mc => new MealCategories
            {
                Id = mc.Id,
                Name = mc.Name
            })
            .ToListAsync();

        return new LobbyDetailsDto
        {
            LobbyId = lobby.Id,
            Name = lobby.Name,
            Users = usersInLobby,
            Blacklist = blacklist,
            IsOwner = isOwner,
            OtherCategories = otherCategories,
            MealCategories = mealCategories
        };
    }


    public async Task<List<LobbyDto>> GetLobbiesForUser(int userId)
    {
        var createdLobbies = await context.Lobbies
            .Where(l => l.CreatedByUserId == userId)
            .Select(l => new LobbyDto
            {
                Id = l.Id,
                Name = l.Name,
                PlayersCount = l.UsersInLobbies.Count()
            })
            .ToListAsync();

        var joinedLobbies = await context.UsersInLobby
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

    public async Task<bool> DeleteLobby(int lobbyId, int userId)
    {
        var lobby = await context.Lobbies.FindAsync(lobbyId);
        if (lobby == null)
            throw new ArgumentException("Podane lobbyDto nie istnieje.");

        if (lobby.CreatedByUserId != userId)
            throw new UnauthorizedAccessException("Nie masz uprawnień do usunięcia tego lobbyDto.");

        context.Lobbies.Remove(lobby);
        await context.SaveChangesAsync();

        return true;
    }

    #endregion

    #region UserList

    public async Task<bool> AddUserToLobby(AddRemoveFromLobbyDto lobbyDto, int requestingUserId)
    {
        using (var transaction = await context.Database.BeginTransactionAsync())
        {
            try
            {
                var user = await context.Users.SingleOrDefaultAsync(u => u.Name == lobbyDto.userName);
                if (user == null) throw new ArgumentException("Taki użytkownik nie istnieje.");
                var lobby = await context.Lobbies.FindAsync(lobbyDto.lobbyId);
                if (lobby == null) throw new ArgumentException("Podane lobbyDto nie istnieje.");

                var isUserInLobby = await context.UsersInLobby
                    .AnyAsync(ul => ul.UserId == user.Id && ul.LobbyId == lobbyDto.lobbyId);

                if (isUserInLobby) throw new InvalidOperationException("Użytkownik już znajduje się w tym lobbyDto.");

                if (lobby.CreatedByUserId != requestingUserId)
                    throw new UnauthorizedAccessException("Nie masz uprawnień do usunięcia tego lobbyDto.");

                var userInLobby = new UsersInLobby
                {
                    UserId = user.Id,
                    LobbyId = lobbyDto.lobbyId
                };

                context.UsersInLobby.Add(userInLobby);
                await context.SaveChangesAsync();

                var cookingDay = new CookingDay
                {
                    UserId = user.Id,
                    LobbyId = lobby.Id
                };

                context.CookingDays.Add(cookingDay);
                await context.SaveChangesAsync();

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

    public async Task<bool> RemoveUserFromLobby(AddRemoveFromLobbyDto lobbyDto, int requestingUserId)
    {
        var lobby = await context.Lobbies.FindAsync(lobbyDto.lobbyId);
        if (lobby == null)
            throw new ArgumentException("Podane lobbyDto nie istnieje.");

        if (lobby.CreatedByUserId != requestingUserId)
            throw new UnauthorizedAccessException("Nie masz uprawnień do usunięcia użytkownika z tego lobbyDto.");

        var user = await context.Users.FirstAsync(u => u.Name == lobbyDto.userName);
        if (user == null) throw new ArgumentException("Użytkownik nie istnieje");

        var userInLobby = await context.UsersInLobby
            .FirstOrDefaultAsync(ul => ul.UserId == user.Id && ul.LobbyId == lobbyDto.lobbyId);

        if (userInLobby == null)
            throw new ArgumentException("Użytkownik nie jest w tym lobbyDto.");

        context.UsersInLobby.Remove(userInLobby);
        await context.SaveChangesAsync();

        return true;
    }

    #endregion

    #region CategoriesList

    public async Task AddCategoryToLobby(AddCategoryByNameDto categoryDto, int userId)
    {
        var lobby = await context.Lobbies.FirstOrDefaultAsync(l => l.Id == categoryDto.LobbyId);

        if (lobby == null)
            throw new ArgumentException("Lobby o podanym ID nie istnieje.");

        var isUserInLobby = await context.UsersInLobby
            .AnyAsync(ul => ul.UserId == userId && ul.LobbyId == categoryDto.LobbyId);

        if (!isUserInLobby && lobby.CreatedByUserId != userId)
            throw new UnauthorizedAccessException("Brak dostępu do tego lobby.");

        if (categoryDto.CategoryType == "meal")
        {
            var mealCategory = new MealCategories { Name = categoryDto.CategoryName, LobbyId = categoryDto.LobbyId };
            await context.MealCategories.AddAsync(mealCategory);
        }
        else if (categoryDto.CategoryType == "other")
        {
            var otherCategory = new OtherCategories { Name = categoryDto.CategoryName, LobbyId = categoryDto.LobbyId };
            await context.OtherCategories.AddAsync(otherCategory);
        }
        else
        {
            throw new ArgumentException("Podano zły typ kateogrii");
        }

        await context.SaveChangesAsync();
    }

    public async Task<bool> RemoveCategory(RemoveCategoryDto removeCategoryDto, int requestingUserId)
    {
        var lobby = await context.Lobbies.FindAsync(removeCategoryDto.lobbyId);
        if (lobby == null)
            throw new ArgumentException("Podane lobby nie istnieje.");

        if (lobby.CreatedByUserId != requestingUserId)
            throw new UnauthorizedAccessException("Nie masz uprawnień do usunięcia kategorii.");

        if (removeCategoryDto.categoryType.Equals("meal", StringComparison.OrdinalIgnoreCase))
        {
            var mealCategory = await context.MealCategories.FirstOrDefaultAsync(mc =>
                mc.Id == removeCategoryDto.categoryId && mc.LobbyId == removeCategoryDto.lobbyId);
            if (mealCategory == null)
                throw new ArgumentException("Podana kategoria posiłków nie istnieje w tym lobby.");

            context.MealCategories.Remove(mealCategory);
        }
        else if (removeCategoryDto.categoryType.Equals("other", StringComparison.OrdinalIgnoreCase))
        {
            var otherCategory = await context.OtherCategories.FirstOrDefaultAsync(oc =>
                oc.Id == removeCategoryDto.categoryId && oc.LobbyId == removeCategoryDto.lobbyId);
            if (otherCategory == null)
                throw new ArgumentException("Podana kategoria nie istnieje w tym lobby.");

            context.OtherCategories.Remove(otherCategory);
        }
        else
        {
            throw new ArgumentException("Nieznany typ kategorii.");
        }

        await context.SaveChangesAsync();
        return true;
    }

    #endregion

    #region Blacklist

    public async Task<bool> AddItemToBlacklist(AddRemoveFromBlackListDto blackListDto, int requestingUserId)
    {
        var lobby = await context.Lobbies.FindAsync(blackListDto.lobbyId);
        if (lobby == null) throw new ArgumentException("Podane lobbyDto nie istnieje.");

        var item = await context.Blacklist.AnyAsync(b =>
            b.Name == blackListDto.itemName && b.LobbyId == blackListDto.lobbyId);
        if (item) throw new ArgumentException("Taki item znajduje się już na liście w lobbyDto.");

        var isUserInLobby = await context.UsersInLobby
            .AnyAsync(ul => ul.UserId == requestingUserId && ul.LobbyId == blackListDto.lobbyId);

        if (isUserInLobby)
            throw new UnauthorizedAccessException("Nie masz uprawnień.");

        var newItem = new Blacklist
        {
            Name = blackListDto.itemName,
            LobbyId = blackListDto.lobbyId
        };

        context.Blacklist.Add(newItem);
        await context.SaveChangesAsync();
        return true;
    }


    public async Task<bool> RemoveItemFromBlacklist(AddRemoveFromBlackListDto blackListDto, int requestingUserId)
    {
        var lobby = await context.Lobbies.FindAsync(blackListDto.lobbyId);
        if (lobby == null)
            throw new ArgumentException("Podane lobbyDto nie istnieje.");

        if (lobby.CreatedByUserId != requestingUserId)
            throw new UnauthorizedAccessException("Nie masz uprawnień do usunięcia przedmiotu z czarnej listy.");

        var item = await context.Blacklist.FirstOrDefaultAsync(b =>
            b.Name == blackListDto.itemName && b.LobbyId == blackListDto.lobbyId);
        if (item == null)
            throw new ArgumentException("Podany przedmiot nie istnieje na czarnej liście tego lobbyDto.");

        context.Blacklist.Remove(item);
        await context.SaveChangesAsync();

        return true;
    }

    #endregion
}