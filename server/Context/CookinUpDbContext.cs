using Microsoft.EntityFrameworkCore;
using server.Models.Db;

namespace server.Context
{
    public class CookinUpDbContext : DbContext
    {
        public CookinUpDbContext(DbContextOptions<CookinUpDbContext> options) : base(options)
        {
        }
        public DbSet<CookingDay> CookingDays { get; set; }
        public DbSet<Dishes> Dishes { get; set; }
        public DbSet<Lobby> Lobbies { get; set; }
        public DbSet<LobbyCategories> LobbyCategories { get; set; }
        public DbSet<MealCategories> MealCategories { get; set; }
        public DbSet<OtherCategories> OtherCategories { get; set; }
        public DbSet<Reviews> Reviews { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<UsersInLobby> UsersInLobby { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UsersInLobby>()
                .HasKey(ul => new { ul.UserId, ul.LobbyId });

            modelBuilder.Entity<UsersInLobby>()
                .HasOne(ul => ul.User)
                .WithMany(u => u.UsersInLobbies)
                .HasForeignKey(ul => ul.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UsersInLobby>()
                .HasOne(ul => ul.Lobby)
                .WithMany(l => l.UsersInLobbies)
                .HasForeignKey(ul => ul.LobbyId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<LobbyCategories>()
                .HasKey(lc => lc.Id);

            modelBuilder.Entity<LobbyCategories>()
                .HasOne(lc => lc.Lobby)
                .WithMany(l => l.LobbyCategories)
                .HasForeignKey(lc => lc.LobbyId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<LobbyCategories>()
                .HasOne(lc => lc.OtherCategory)
                .WithMany()
                .HasForeignKey(lc => lc.OtherCategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<LobbyCategories>()
                .HasOne(lc => lc.MealCategories)
                .WithMany()
                .HasForeignKey(lc => lc.MealCategoriesId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Reviews>()
                .HasKey(r => r.Id);

            modelBuilder.Entity<Reviews>()
                .HasOne(r => r.Dish)
                .WithMany(d => d.Reviews)
                .HasForeignKey(r => r.DishId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Reviews>()
                .HasOne(r => r.UserWhoReview)
                .WithMany()
                .HasForeignKey(r => r.UserWhoReviewId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CookingDay>()
                .HasOne(cd => cd.User)
                .WithMany(u => u.CookingDays)
                .HasForeignKey(cd => cd.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CookingDay>()
                .HasOne(cd => cd.Lobby)
                .WithMany(l => l.CookingDays)
                .HasForeignKey(cd => cd.LobbyId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Dishes>()
                .HasOne(d => d.CookingDay)
                .WithMany(cd => cd.Dishes)
                .HasForeignKey(d => d.CookingDayId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Dishes>()
                .HasOne(d => d.MealCategory)
                .WithMany(mc => mc.Dishes)
                .HasForeignKey(d => d.MealCategoryId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}