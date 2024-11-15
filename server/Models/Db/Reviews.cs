namespace server.Models.Db;

public class Reviews
{
    public int Id { get; set; }
    public double Review { get; set; }

    public string? Comment { get; set; }

    public int UserWhoReviewId { get; set; }
    public Users? UserWhoReview { get; set; }

    public int CookingDayId { get; set; }
    public CookingDay? CookingDay { get; set; }

    public int? MealCategoryId { get; set; }
    public MealCategories? MealCategory { get; set; }

    public int? OtherCategoryId { get; set; }
    public OtherCategories? OtherCategory { get; set; }

    public int LobbyId { get; set; }
    public Lobby? Lobby { get; set; }
}