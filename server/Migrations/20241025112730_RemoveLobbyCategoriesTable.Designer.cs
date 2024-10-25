﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.Context;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(CookinUpDbContext))]
    [Migration("20241025112730_RemoveLobbyCategoriesTable")]
    partial class RemoveLobbyCategoriesTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("server.Models.Db.Blacklist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("LobbyId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("LobbyId");

                    b.ToTable("Blacklist");
                });

            modelBuilder.Entity("server.Models.Db.CookingDay", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("LobbyId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LobbyId");

                    b.HasIndex("UserId");

                    b.ToTable("CookingDays");
                });

            modelBuilder.Entity("server.Models.Db.Dishes", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CookingDayId")
                        .HasColumnType("int");

                    b.Property<string>("Image")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<int>("MealCategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("CookingDayId");

                    b.HasIndex("MealCategoryId");

                    b.ToTable("Dishes");
                });

            modelBuilder.Entity("server.Models.Db.Lobby", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CreatedByUserId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedByUserId");

                    b.ToTable("Lobbies");
                });

            modelBuilder.Entity("server.Models.Db.MealCategories", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("LobbyId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("LobbyId");

                    b.ToTable("MealCategories");
                });

            modelBuilder.Entity("server.Models.Db.OtherCategories", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("LobbyId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("LobbyId");

                    b.ToTable("OtherCategories");
                });

            modelBuilder.Entity("server.Models.Db.Reviews", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("DishId")
                        .HasColumnType("int");

                    b.Property<double>("Review")
                        .ValueGeneratedOnAdd()
                        .HasPrecision(2, 1)
                        .HasColumnType("double")
                        .HasDefaultValue(0.0);

                    b.Property<int>("UserWhoReviewId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DishId");

                    b.HasIndex("UserWhoReviewId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("server.Models.Db.RevokedToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("RevokedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.HasKey("Id");

                    b.ToTable("RevokedTokens");
                });

            modelBuilder.Entity("server.Models.Db.UserSession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<DateTime>("RefreshTokenExpiryTime")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("RevokedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserSessions");
                });

            modelBuilder.Entity("server.Models.Db.Users", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasAnnotation("EmailAddress", true);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("server.Models.Db.UsersInLobby", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("LobbyId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "LobbyId");

                    b.HasIndex("LobbyId");

                    b.ToTable("UsersInLobby");
                });

            modelBuilder.Entity("server.Models.Db.Blacklist", b =>
                {
                    b.HasOne("server.Models.Db.Lobby", "Lobby")
                        .WithMany("Blacklists")
                        .HasForeignKey("LobbyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lobby");
                });

            modelBuilder.Entity("server.Models.Db.CookingDay", b =>
                {
                    b.HasOne("server.Models.Db.Lobby", "Lobby")
                        .WithMany("CookingDays")
                        .HasForeignKey("LobbyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.Db.Users", "User")
                        .WithMany("CookingDays")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lobby");

                    b.Navigation("User");
                });

            modelBuilder.Entity("server.Models.Db.Dishes", b =>
                {
                    b.HasOne("server.Models.Db.CookingDay", "CookingDay")
                        .WithMany("Dishes")
                        .HasForeignKey("CookingDayId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.Db.MealCategories", "MealCategory")
                        .WithMany("Dishes")
                        .HasForeignKey("MealCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CookingDay");

                    b.Navigation("MealCategory");
                });

            modelBuilder.Entity("server.Models.Db.Lobby", b =>
                {
                    b.HasOne("server.Models.Db.Users", "CreatedByUser")
                        .WithMany("LobbiesCreated")
                        .HasForeignKey("CreatedByUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatedByUser");
                });

            modelBuilder.Entity("server.Models.Db.MealCategories", b =>
                {
                    b.HasOne("server.Models.Db.Lobby", "Lobby")
                        .WithMany("MealCategories")
                        .HasForeignKey("LobbyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lobby");
                });

            modelBuilder.Entity("server.Models.Db.OtherCategories", b =>
                {
                    b.HasOne("server.Models.Db.Lobby", "Lobby")
                        .WithMany("OtherCategories")
                        .HasForeignKey("LobbyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lobby");
                });

            modelBuilder.Entity("server.Models.Db.Reviews", b =>
                {
                    b.HasOne("server.Models.Db.Dishes", "Dish")
                        .WithMany("Reviews")
                        .HasForeignKey("DishId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.Db.Users", "UserWhoReview")
                        .WithMany()
                        .HasForeignKey("UserWhoReviewId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dish");

                    b.Navigation("UserWhoReview");
                });

            modelBuilder.Entity("server.Models.Db.UserSession", b =>
                {
                    b.HasOne("server.Models.Db.Users", "User")
                        .WithMany("UserSessions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("server.Models.Db.UsersInLobby", b =>
                {
                    b.HasOne("server.Models.Db.Lobby", "Lobby")
                        .WithMany("UsersInLobbies")
                        .HasForeignKey("LobbyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.Db.Users", "User")
                        .WithMany("UsersInLobbies")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lobby");

                    b.Navigation("User");
                });

            modelBuilder.Entity("server.Models.Db.CookingDay", b =>
                {
                    b.Navigation("Dishes");
                });

            modelBuilder.Entity("server.Models.Db.Dishes", b =>
                {
                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("server.Models.Db.Lobby", b =>
                {
                    b.Navigation("Blacklists");

                    b.Navigation("CookingDays");

                    b.Navigation("MealCategories");

                    b.Navigation("OtherCategories");

                    b.Navigation("UsersInLobbies");
                });

            modelBuilder.Entity("server.Models.Db.MealCategories", b =>
                {
                    b.Navigation("Dishes");
                });

            modelBuilder.Entity("server.Models.Db.Users", b =>
                {
                    b.Navigation("CookingDays");

                    b.Navigation("LobbiesCreated");

                    b.Navigation("UserSessions");

                    b.Navigation("UsersInLobbies");
                });
#pragma warning restore 612, 618
        }
    }
}
