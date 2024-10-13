using server.Interfaces;
using server.Models.DTOs;
using server.Services;

namespace server.Static;

public static class ServiceRegistration
{
    public static bool isDev;

    public static void AddApplicationServices(this IServiceCollection services)
    {
        // Rejestracja serwisów
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ILobbyService, LobbyService>();
        services.AddScoped<ICookingDayService, CookingDayService>();
        services.AddScoped<IUserService, UserService>();
    }
}