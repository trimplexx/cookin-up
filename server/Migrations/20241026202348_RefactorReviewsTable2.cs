using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class RefactorReviewsTable2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Dishes_DishId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_DishId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "DishId",
                table: "Reviews");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "DishId",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_DishId",
                table: "Reviews",
                column: "DishId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Dishes_DishId",
                table: "Reviews",
                column: "DishId",
                principalTable: "Dishes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
