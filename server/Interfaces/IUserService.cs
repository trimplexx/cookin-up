using server.Models.DTOs;

namespace server.Interfaces
{
    public interface IUserService
    {
        Task<bool> Register(UserRegisterDto userRegisterDto);
        Task<string?> Login(UserLoginDto userLoginDto);
    }
}
