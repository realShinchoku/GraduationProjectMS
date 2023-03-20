using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateInstructorPeriod : Migration
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

            migrationBuilder.AddColumn<string>(
                name: "FacultyId",
                table: "GraduationProjectPeriods",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GraduationProjectPeriods_FacultyId",
                table: "GraduationProjectPeriods",
                column: "FacultyId");

            migrationBuilder.AddForeignKey(
                name: "FK_GraduationProjectPeriods_Faculties_FacultyId",
                table: "GraduationProjectPeriods",
                column: "FacultyId",
                principalTable: "Faculties",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GraduationProjectPeriods_Faculties_FacultyId",
                table: "GraduationProjectPeriods");

            migrationBuilder.DropIndex(
                name: "IX_GraduationProjectPeriods_FacultyId",
                table: "GraduationProjectPeriods");

            migrationBuilder.DropColumn(
                name: "ApprovalStatus",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "FacultyId",
                table: "GraduationProjectPeriods");

            migrationBuilder.RenameColumn(
                name: "IsApproval",
                table: "Instructors",
                newName: "IsConfirm");
        }
    }
}
