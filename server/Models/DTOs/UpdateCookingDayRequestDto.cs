namespace server.Models.DTOs;
public class UpdateCookingDayRequestDto
{
    public DateTime? NewDate { get; set; }
    public List<UpdateDishRequestDto>? Dishes { get; set; }
}