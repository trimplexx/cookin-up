namespace server.Models.Db;

public class UserSession
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? RevokedAt { get; set; }

    public Users User { get; set; }
}