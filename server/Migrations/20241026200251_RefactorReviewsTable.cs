using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class RefactorReviewsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MealCategoryId",
                table: "Reviews",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OtherCategoryId",
                table: "Reviews",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_MealCategoryId",
                table: "Reviews",
                column: "MealCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_OtherCategoryId",
                table: "Reviews",
                column: "OtherCategoryId");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Reviews_OnlyOneCategory",
                table: "Reviews",
                sql: "(MealCategoryId IS NOT NULL AND OtherCategoryId IS NULL) OR (MealCategoryId IS NULL AND OtherCategoryId IS NOT NULL)");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_MealCategories_MealCategoryId",
                table: "Reviews",
                column: "MealCategoryId",
                principalTable: "MealCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_OtherCategories_OtherCategoryId",
                table: "Reviews",
                column: "OtherCategoryId",
                principalTable: "OtherCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_MealCategories_MealCategoryId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_OtherCategories_OtherCategoryId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_MealCategoryId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_OtherCategoryId",
                table: "Reviews");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Reviews_OnlyOneCategory",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "MealCategoryId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "OtherCategoryId",
                table: "Reviews");
        }
    }
}
