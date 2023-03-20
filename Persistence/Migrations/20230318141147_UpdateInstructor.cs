using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateInstructor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsConfirm",
                table: "Instructors",
                newName: "IsApproval");

            migrationBuilder.AddColumn<bool>(
                name: "ApprovalStatus",
                table: "Instructors",
                type: "boolean",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovalStatus",
                table: "Instructors");

            migrationBuilder.RenameColumn(
                name: "IsApproval",
                table: "Instructors",
                newName: "IsConfirm");
        }
    }
}
