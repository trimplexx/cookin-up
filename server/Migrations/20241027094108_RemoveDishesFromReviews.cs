using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDishesFromReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Dishes_DishesId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_DishesId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "DishesId",
                table: "Reviews");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DishesId",
                table: "Reviews",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_DishesId",
                table: "Reviews",
                column: "DishesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Dishes_DishesId",
                table: "Reviews",
                column: "DishesId",
                principalTable: "Dishes",
                principalColumn: "Id");
        }
    }
}
