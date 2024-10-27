namespace server.Models.DTOs;

public class UserRatingSummaryDto
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public List<CategoryAverageDto> MealCategoryRatings { get; set; }
    public List<CategoryAverageDto> OtherCategoryRatings { get; set; }
}