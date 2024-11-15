using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Interfaces;

namespace server.Services;

public class UserService(CookinUpDbContext context) : IUserService
{
    public async Task<string?> GetUserNameById(int userId)
    {
        var user = await context.Users.SingleOrDefaultAsync(u => u.Id == userId);

        if (user == null) return null;

        return user.Name;
    }
}