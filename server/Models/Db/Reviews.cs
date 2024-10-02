namespace server.Models.Db;

public class Reviews
{
    public int Id { get; set; }
    public int DishId { get; set; }
    public Dishes? Dish { get; set; }
    public double Review { get; set; }
    public int UserWhoReviewId { get; set; }
    public Users? UserWhoReview { get; set; }
}