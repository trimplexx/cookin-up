namespace server.Models.Db;

public class Blacklist
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int LobbyId { get; set; }

    public Lobby Lobby { get; set; }
}