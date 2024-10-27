namespace server.Models.DTOs;

public class ReviewDto
{
    public int ReviewId { get; set; }
    public double Rating { get; set; }
    public int CategoryId { get; set; }
    public string CategoryType { get; set; }
}