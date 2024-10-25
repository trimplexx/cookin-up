using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveLobbyCategoriesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LobbyCategories");

            migrationBuilder.AddColumn<int>(
                name: "LobbyId",
                table: "OtherCategories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LobbyId",
                table: "MealCategories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OtherCategories_LobbyId",
                table: "OtherCategories",
                column: "LobbyId");

            migrationBuilder.CreateIndex(
                name: "IX_MealCategories_LobbyId",
                table: "MealCategories",
                column: "LobbyId");

            migrationBuilder.AddForeignKey(
                name: "FK_MealCategories_Lobbies_LobbyId",
                table: "MealCategories",
                column: "LobbyId",
                principalTable: "Lobbies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OtherCategories_Lobbies_LobbyId",
                table: "OtherCategories",
                column: "LobbyId",
                principalTable: "Lobbies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealCategories_Lobbies_LobbyId",
                table: "MealCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_OtherCategories_Lobbies_LobbyId",
                table: "OtherCategories");

            migrationBuilder.DropIndex(
                name: "IX_OtherCategories_LobbyId",
                table: "OtherCategories");

            migrationBuilder.DropIndex(
                name: "IX_MealCategories_LobbyId",
                table: "MealCategories");

            migrationBuilder.DropColumn(
                name: "LobbyId",
                table: "OtherCategories");

            migrationBuilder.DropColumn(
                name: "LobbyId",
                table: "MealCategories");

            migrationBuilder.CreateTable(
                name: "LobbyCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    LobbyId = table.Column<int>(type: "int", nullable: false),
                    MealCategoriesId = table.Column<int>(type: "int", nullable: false),
                    OtherCategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LobbyCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LobbyCategories_Lobbies_LobbyId",
                        column: x => x.LobbyId,
                        principalTable: "Lobbies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LobbyCategories_MealCategories_MealCategoriesId",
                        column: x => x.MealCategoriesId,
                        principalTable: "MealCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LobbyCategories_OtherCategories_OtherCategoryId",
                        column: x => x.OtherCategoryId,
                        principalTable: "OtherCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_LobbyCategories_LobbyId",
                table: "LobbyCategories",
                column: "LobbyId");

            migrationBuilder.CreateIndex(
                name: "IX_LobbyCategories_MealCategoriesId",
                table: "LobbyCategories",
                column: "MealCategoriesId");

            migrationBuilder.CreateIndex(
                name: "IX_LobbyCategories_OtherCategoryId",
                table: "LobbyCategories",
                column: "OtherCategoryId");
        }
    }
}
