namespace server.Interfaces;

public interface IUserService
{
    Task<string?> GetUserNameById(int userId);
}