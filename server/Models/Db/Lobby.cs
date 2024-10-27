namespace server.Models.Db;

public class Lobby
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int CreatedByUserId { get; set; }
    public Users CreatedByUser { get; set; }
    public ICollection<CookingDay> CookingDays { get; set; }
    public ICollection<UsersInLobby> UsersInLobbies { get; set; }
    public ICollection<MealCategories> MealCategories { get; set; }
    public ICollection<OtherCategories> OtherCategories { get; set; }
    public ICollection<Blacklist> Blacklists { get; set; }
    public ICollection<Reviews> Reviews { get; set; }
}