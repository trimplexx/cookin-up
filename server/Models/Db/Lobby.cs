namespace server.Models.Db;

public class Lobby
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<CookingDay> CookingDays { get; set; }
    public ICollection<UsersInLobby> UsersInLobbies { get; set; }
    public ICollection<LobbyCategories> LobbyCategories { get; set; }
    public ICollection<Blacklist> Blacklists { get; set; }
}