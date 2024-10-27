namespace server.Models.Db;

public class MealCategories
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int LobbyId { get; set; }

    public Lobby Lobby { get; set; }

    public ICollection<Dishes> Dishes { get; set; }
    public ICollection<Reviews> Reviews { get; set; }
}