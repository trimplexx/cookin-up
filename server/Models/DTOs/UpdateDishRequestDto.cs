namespace server.Models.DTOs;

public class UpdateDishRequestDto
{
    public int? Id { get; set; }
    public string? Name { get; set; }
    public string? Image { get; set; }
    public int? MealCategoryId { get; set; }
}
