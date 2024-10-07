namespace server.Models.DTOs;

public class LobbyDetailsDto
{
    public int LobbyId { get; set; }
    public string Name { get; set; }
    public List<UserDto> Users { get; set; }
    public List<BlacklistDto> Blacklist { get; set; }
}