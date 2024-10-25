namespace server.Models.DTOs;

public class AddCategoryByNameDto
{
    public int LobbyId { get; set; }
    public string CategoryName { get; set; }
    public string CategoryType { get; set; }
}