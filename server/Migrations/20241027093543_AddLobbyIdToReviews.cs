using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddLobbyIdToReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LobbyId",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_LobbyId",
                table: "Reviews",
                column: "LobbyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Lobbies_LobbyId",
                table: "Reviews",
                column: "LobbyId",
                principalTable: "Lobbies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Lobbies_LobbyId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_LobbyId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "LobbyId",
                table: "Reviews");
        }
    }
}
