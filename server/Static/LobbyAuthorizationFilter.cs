using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using server.Context;

namespace server.Static;

public class LobbyAuthorizationFilter : IAsyncActionFilter
{
    private readonly CookinUpDbContext _context;
    private readonly string _cookingDayIdParamName;
    private readonly string _lobbyIdParamName;
    private readonly string _userIdClaimName;

    public LobbyAuthorizationFilter(
        CookinUpDbContext context,
        string lobbyIdParamName = "lobbyId",
        string cookingDayIdParamName = "cookingDayId",
        string userIdClaimName = "Id")
    {
        _context = context;
        _lobbyIdParamName = lobbyIdParamName;
        _cookingDayIdParamName = cookingDayIdParamName;
        _userIdClaimName = userIdClaimName;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (context.HttpContext.User.FindFirst(_userIdClaimName)?.Value is not string userIdStr ||
            !int.TryParse(userIdStr, out var userId))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        int? lobbyId = null;
        int? cookingDayId = null;

        if (context.ActionArguments.TryGetValue(_lobbyIdParamName, out var lobbyIdObj) &&
            lobbyIdObj is int id) lobbyId = id;
        if (context.ActionArguments.TryGetValue(_cookingDayIdParamName, out var cookingDayIdObj) &&
            cookingDayIdObj is int dayId) cookingDayId = dayId;

        if (lobbyId == null || cookingDayId == null)
            foreach (var arg in context.ActionArguments.Values)
            {
                if (arg == null) continue;

                var lobbyIdProperty = arg.GetType().GetProperty("LobbyId",
                    BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (lobbyIdProperty != null && lobbyIdProperty.GetValue(arg) is int dtoLobbyId) lobbyId = dtoLobbyId;

                var cookingDayIdProperty = arg.GetType().GetProperty("CookingDayId",
                    BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (cookingDayIdProperty != null && cookingDayIdProperty.GetValue(arg) is int dtoCookingDayId)
                    cookingDayId = dtoCookingDayId;
            }

        if (lobbyId == null && cookingDayId == null)
        {
            context.Result =
                new BadRequestObjectResult(
                    $"Nieprawidłowy lub brakujący parametr: {_lobbyIdParamName} lub {_cookingDayIdParamName}.");
            return;
        }

        if (cookingDayId.HasValue && !lobbyId.HasValue)
        {
            var cookingDay = await _context.CookingDays
                .AsNoTracking()
                .FirstOrDefaultAsync(cd => cd.Id == cookingDayId);
            if (cookingDay == null)
            {
                context.Result = new NotFoundObjectResult("Nie znaleziono dnia gotowania");
                return;
            }

            lobbyId = cookingDay.LobbyId;
        }

        if (!lobbyId.HasValue)
        {
            context.Result = new BadRequestObjectResult("Nie znaleziono lobbyId");
            return;
        }

        var lobby = await _context.Lobbies
            .Include(l => l.UsersInLobbies)
            .FirstOrDefaultAsync(l => l.Id == lobbyId);

        if (lobby == null)
        {
            context.Result = new NotFoundObjectResult("Nie znaleziono lobby");
            return;
        }

        var isAuthorized = lobby.CreatedByUserId == userId || lobby.UsersInLobbies.Any(ul => ul.UserId == userId);
        if (!isAuthorized)
        {
            context.Result = new ForbidResult("Nie masz uprawnień.");
            return;
        }

        await next();
    }
}