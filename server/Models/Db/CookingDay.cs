namespace server.Models.Db;

public class CookingDay
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public Users? User { get; set; }
    public int LobbyId { get; set; }
    public Lobby? Lobby { get; set; }
    public DateTime? Date { get; set; }
    public ICollection<Dishes>? Dishes { get; set; }
}