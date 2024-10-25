namespace server.Models.DTOs;

public class RemoveCategoryDto
{
    public int lobbyId { get; set; }
    public int categoryId { get; set; }
    public string categoryType { get; set; }
}