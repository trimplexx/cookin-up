namespace server.Models.DTOs;

public class UserDto
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public bool IsCurrentUser { get; set; }
    public DateTime? CookingDayDate { get; set; }
    public int CookingDayId { get; set; }
}