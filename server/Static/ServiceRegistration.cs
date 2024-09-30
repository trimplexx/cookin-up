using server.Interfaces;
using server.Services;

namespace server.Static
{
    public static class ServiceRegistration
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            // Rejestracja serwisów
            services.AddScoped<IUserService, UserService>();
        }
    }
}
