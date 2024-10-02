using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedByUserToLobby : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedByUserId",
                table: "Lobbies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Lobbies_CreatedByUserId",
                table: "Lobbies",
                column: "CreatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lobbies_Users_CreatedByUserId",
                table: "Lobbies",
                column: "CreatedByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lobbies_Users_CreatedByUserId",
                table: "Lobbies");

            migrationBuilder.DropIndex(
                name: "IX_Lobbies_CreatedByUserId",
                table: "Lobbies");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "Lobbies");
        }
    }
}
