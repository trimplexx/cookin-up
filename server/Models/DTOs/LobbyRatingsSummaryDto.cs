namespace server.Models.DTOs;

public class LobbyRatingsSummaryDto
{
    public int LobbyId { get; set; }
    public List<UserRatingSummaryDto> UserRatings { get; set; }
}