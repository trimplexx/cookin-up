using Microsoft.AspNetCore.Mvc;

namespace server.Static;

[AttributeUsage(AttributeTargets.Method, Inherited = true)]
public class LobbyAuthorizationAttribute : TypeFilterAttribute
{
    public LobbyAuthorizationAttribute() : base(typeof(LobbyAuthorizationFilter))
    {
    }
}