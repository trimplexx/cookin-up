namespace server.Models.Db
{
    public class Dishes
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; }
        public int CookingDayId { get; set; }
        public CookingDay? CookingDay { get; set; }
        public int MealCategoryId { get; set; }
        public MealCategories? MealCategory { get; set; }
        public ICollection<Reviews>? Reviews { get; set; }
    }
}
