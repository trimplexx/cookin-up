namespace server.Models.Db;

public class LobbyCategories
{
    public int Id { get; set; }
    public int LobbyId { get; set; }
    public Lobby? Lobby { get; set; }
    public int OtherCategoryId { get; set; }
    public OtherCategories? OtherCategory { get; set; }
    public int MealCategoriesId { get; set; }
    public MealCategories? MealCategories { get; set; }
}