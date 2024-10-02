namespace server.Models.Db;

public class MealCategories
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public ICollection<Dishes>? Dishes { get; set; }
}