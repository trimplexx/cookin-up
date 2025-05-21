namespace server.Models.DTOs;

public class RateCategoryRequestDto
{
    public int CategoryId { get; set; }
    public string CategoryType { get; set; }
    public double Rating { get; set; }
    public int LobbyId { get; set; }
    public int CookingDayId { get; set; }
    public string? Comment { get; set; }
}