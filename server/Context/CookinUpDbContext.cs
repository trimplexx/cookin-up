using Microsoft.EntityFrameworkCore;
using server.Models.Db;

namespace server.Context;

public class CookinUpDbContext : DbContext
{
    public CookinUpDbContext(DbContextOptions<CookinUpDbContext> options) : base(options)
    {
    }

    public DbSet<CookingDay> CookingDays { get; set; }
    public DbSet<Dishes> Dishes { get; set; }
    public DbSet<Lobby> Lobbies { get; set; }
    public DbSet<MealCategories> MealCategories { get; set; }
    public DbSet<OtherCategories> OtherCategories { get; set; }
    public DbSet<Reviews> Reviews { get; set; }
    public DbSet<Users> Users { get; set; }
    public DbSet<UsersInLobby> UsersInLobby { get; set; }
    public DbSet<Blacklist> Blacklist { get; set; }
    public DbSet<RevokedToken> RevokedTokens { get; set; }
    public DbSet<UserSession> UserSessions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Blacklist
        modelBuilder.Entity<Blacklist>(entity =>
        {
            entity.HasKey(b => b.Id);
            entity.Property(b => b.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasOne(b => b.Lobby)
                .WithMany(l => l.Blacklists)
                .HasForeignKey(b => b.LobbyId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // CookingDay
        modelBuilder.Entity<CookingDay>(entity =>
        {
            entity.HasKey(cd => cd.Id);

            entity.HasOne(cd => cd.User)
                .WithMany(u => u.CookingDays)
                .HasForeignKey(cd => cd.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(cd => cd.Lobby)
                .WithMany(l => l.CookingDays)
                .HasForeignKey(cd => cd.LobbyId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Dishes
        modelBuilder.Entity<Dishes>(entity =>
        {
            entity.HasKey(d => d.Id);
            entity.Property(d => d.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(d => d.Image)
                .HasMaxLength(255);

            entity.HasOne(d => d.CookingDay)
                .WithMany(cd => cd.Dishes)
                .HasForeignKey(d => d.CookingDayId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(d => d.MealCategory)
                .WithMany(mc => mc.Dishes)
                .HasForeignKey(d => d.MealCategoryId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Lobby
        modelBuilder.Entity<Lobby>(entity =>
        {
            entity.HasKey(l => l.Id);
            entity.Property(l => l.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasOne(l => l.CreatedByUser)
                .WithMany(u => u.LobbiesCreated)
                .HasForeignKey(l => l.CreatedByUserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // MealCategories
        modelBuilder.Entity<MealCategories>(entity =>
        {
            entity.HasKey(mc => mc.Id);
            entity.Property(mc => mc.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasOne(mc => mc.Lobby)
                .WithMany(l => l.MealCategories)
                .HasForeignKey(mc => mc.LobbyId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // OtherCategories
        modelBuilder.Entity<OtherCategories>(entity =>
        {
            entity.HasKey(oc => oc.Id);
            entity.Property(oc => oc.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasOne(oc => oc.Lobby)
                .WithMany(l => l.OtherCategories)
                .HasForeignKey(oc => oc.LobbyId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Reviews
        modelBuilder.Entity<Reviews>(entity =>
        {
            entity.HasKey(r => r.Id);

            entity.Property(r => r.Review)
                .IsRequired()
                .HasPrecision(2, 1)
                .HasDefaultValue(0.0);

            entity.HasOne(r => r.UserWhoReview)
                .WithMany()
                .HasForeignKey(r => r.UserWhoReviewId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(r => r.CookingDay)
                .WithMany()
                .HasForeignKey(r => r.CookingDayId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(r => r.MealCategory)
                .WithMany(mc => mc.Reviews)
                .HasForeignKey(r => r.MealCategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(r => r.OtherCategory)
                .WithMany(oc => oc.Reviews)
                .HasForeignKey(r => r.OtherCategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(r => r.Lobby)
                .WithMany(l => l.Reviews)
                .HasForeignKey(r => r.LobbyId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasCheckConstraint("CK_Reviews_OnlyOneCategory",
                "(MealCategoryId IS NOT NULL AND OtherCategoryId IS NULL) OR " +
                "(MealCategoryId IS NULL AND OtherCategoryId IS NOT NULL)");
        });

        modelBuilder.Entity<Users>(entity =>
        {
            entity.HasKey(u => u.Id);

            entity.Property(u => u.Name)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(255)
                .HasAnnotation("EmailAddress", true);

            entity.Property(u => u.Password)
                .IsRequired()
                .HasMaxLength(255);
        });

        // UsersInLobby
        modelBuilder.Entity<UsersInLobby>(entity =>
        {
            entity.HasKey(ul => new { ul.UserId, ul.LobbyId });

            entity.HasOne(ul => ul.User)
                .WithMany(u => u.UsersInLobbies)
                .HasForeignKey(ul => ul.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(ul => ul.Lobby)
                .WithMany(l => l.UsersInLobbies)
                .HasForeignKey(ul => ul.LobbyId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // RevokedToken
        modelBuilder.Entity<RevokedToken>(entity =>
        {
            entity.HasKey(rt => rt.Id);

            entity.Property(rt => rt.Token)
                .IsRequired()
                .HasMaxLength(500);

            entity.Property(rt => rt.RevokedAt)
                .IsRequired();
        });

        // UserSession
        modelBuilder.Entity<UserSession>(entity =>
        {
            entity.HasKey(us => us.Id);

            entity.Property(us => us.RefreshToken)
                .IsRequired()
                .HasMaxLength(500);

            entity.Property(us => us.RefreshTokenExpiryTime)
                .IsRequired();

            entity.Property(us => us.CreatedAt)
                .IsRequired();

            entity.HasOne(us => us.User)
                .WithMany(u => u.UserSessions)
                .HasForeignKey(us => us.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}