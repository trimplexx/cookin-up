namespace server.Models.DTOs;

public class CookingDayDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int LobbyId { get; set; }
    public DateTime? Date { get; set; }
}