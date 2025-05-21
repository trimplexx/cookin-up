namespace server.Models.DTOs;

public class CategoryAverageWithCommentsDto
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    public double AverageRating { get; set; }
    public List<UserCommentDto> Comments { get; set; }
}