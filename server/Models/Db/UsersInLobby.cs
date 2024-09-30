namespace server.Models.Db
{
    public class UsersInLobby
    {
        public int UserId { get; set; }
        public Users? User { get; set; }
        public int LobbyId { get; set; }
        public Lobby? Lobby { get; set; }
    }
}