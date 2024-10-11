using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Interfaces;

namespace server.Services;

public class UserService : IUserService
{
    private readonly CookinUpDbContext _context;

    public UserService(CookinUpDbContext context)
    {
        _context = context;
    }

    public async Task<string?> GetUserNameById(int userId)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);

        if (user == null) return null;

        return user.Name;
    }
}