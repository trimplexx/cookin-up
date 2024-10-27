namespace server.Models.DTOs;

public class MealCategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<DishDto>? Dishes { get; set; }
}