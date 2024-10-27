using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddCookingDayIdFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CookingDayId",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_CookingDayId",
                table: "Reviews",
                column: "CookingDayId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_CookingDays_CookingDayId",
                table: "Reviews",
                column: "CookingDayId",
                principalTable: "CookingDays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_CookingDays_CookingDayId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_CookingDayId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "CookingDayId",
                table: "Reviews");
        }
    }
}
