﻿namespace server.Models.Db
{
    public class Users
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<CookingDay>? CookingDays { get; set; }
        public ICollection<UsersInLobby>? UsersInLobbies { get; set; }
    }
}
