namespace server.Models.DTOs;

public class UserRatingSummaryDto
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public List<CategoryAverageWithCommentsDto> MealCategoryRatings { get; set; }
    public List<CategoryAverageWithCommentsDto> OtherCategoryRatings { get; set; }
}