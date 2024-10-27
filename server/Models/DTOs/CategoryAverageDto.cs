namespace server.Models.DTOs;

public class CategoryAverageDto
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    public double AverageRating { get; set; }
}