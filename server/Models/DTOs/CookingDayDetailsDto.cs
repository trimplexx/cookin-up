using server.Models.Db;

namespace server.Models.DTOs;

public class CookingDayDetailsDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int LobbyId { get; set; }
    public string UserName { get; set; }
    public bool isCurrentUser { get; set; }
    public DateTime? Date { get; set; }
    public List<MealCategoryDto> MealCategories { get; set; }
    public List<OtherCategories> OtherCategories { get; set; }
    public List<ReviewDto> UserReviews { get; set; } = new List<ReviewDto>();
}