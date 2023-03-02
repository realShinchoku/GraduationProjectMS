using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GraduationProjectPeriods",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    ContactInstructorTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RegisterTopicTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SyllabusSubmissionTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SyllabusReviewTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GraduationProjectTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ProtectionTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GraduationProjectPeriods", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GraduationProjectReports",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ReportStatus = table.Column<int>(type: "integer", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    CreateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GraduationProjectReports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GraduationProjects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GraduationProjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Syllabi",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    SyllabusStatus = table.Column<int>(type: "integer", nullable: false),
                    Note = table.Column<string>(type: "text", nullable: true),
                    Url = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    CreateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Syllabi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Birthday = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Role = table.Column<int>(type: "integer", nullable: false),
                    Sex = table.Column<bool>(type: "boolean", nullable: false),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
                    Avatar = table.Column<string>(type: "text", nullable: true),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Faculties",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faculties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Faculties_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DepartmentSubjects",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    FacultyId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepartmentSubjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DepartmentSubjects_Faculties_FacultyId",
                        column: x => x.FacultyId,
                        principalTable: "Faculties",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DepartmentSubjects_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Lecturers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    DepartmentSubjectId = table.Column<string>(type: "text", nullable: true),
                    FacultyId = table.Column<string>(type: "text", nullable: true),
                    InstructorStatus = table.Column<int>(type: "integer", nullable: false),
                    MaxStudentsNumber = table.Column<int>(type: "integer", nullable: false),
                    Education = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lecturers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lecturers_DepartmentSubjects_DepartmentSubjectId",
                        column: x => x.DepartmentSubjectId,
                        principalTable: "DepartmentSubjects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Lecturers_Faculties_FacultyId",
                        column: x => x.FacultyId,
                        principalTable: "Faculties",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Lecturers_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    LecturerId = table.Column<string>(type: "text", nullable: true),
                    DepartmentSubjectId = table.Column<string>(type: "text", nullable: true),
                    FacultyId = table.Column<string>(type: "text", nullable: true),
                    GraduationProjectId = table.Column<Guid>(type: "uuid", nullable: true),
                    GraduationProjectPeriodId = table.Column<Guid>(type: "uuid", nullable: true),
                    GraduationProjectReportId = table.Column<string>(type: "text", nullable: true),
                    SyllabusId = table.Column<string>(type: "text", nullable: true),
                    Point = table.Column<decimal>(type: "numeric", nullable: false),
                    StudentId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Students_DepartmentSubjects_DepartmentSubjectId",
                        column: x => x.DepartmentSubjectId,
                        principalTable: "DepartmentSubjects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Students_Faculties_FacultyId",
                        column: x => x.FacultyId,
                        principalTable: "Faculties",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Students_GraduationProjectPeriods_GraduationProjectPeriodId",
                        column: x => x.GraduationProjectPeriodId,
                        principalTable: "GraduationProjectPeriods",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Students_GraduationProjectReports_GraduationProjectReportId",
                        column: x => x.GraduationProjectReportId,
                        principalTable: "GraduationProjectReports",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Students_GraduationProjects_GraduationProjectId",
                        column: x => x.GraduationProjectId,
                        principalTable: "GraduationProjects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Students_Lecturers_LecturerId",
                        column: x => x.LecturerId,
                        principalTable: "Lecturers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Students_Syllabi_SyllabusId",
                        column: x => x.SyllabusId,
                        principalTable: "Syllabi",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Students_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Instructors",
                columns: table => new
                {
                    StudentId = table.Column<string>(type: "text", nullable: false),
                    LecturerId = table.Column<string>(type: "text", nullable: false),
                    FacultyId = table.Column<string>(type: "text", nullable: false),
                    IsConfirm = table.Column<bool>(type: "boolean", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instructors", x => new { x.StudentId, x.FacultyId, x.LecturerId });
                    table.ForeignKey(
                        name: "FK_Instructors_Faculties_FacultyId",
                        column: x => x.FacultyId,
                        principalTable: "Faculties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Instructors_Lecturers_LecturerId",
                        column: x => x.LecturerId,
                        principalTable: "Lecturers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Instructors_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DepartmentSubjects_FacultyId",
                table: "DepartmentSubjects",
                column: "FacultyId");

            migrationBuilder.CreateIndex(
                name: "IX_Instructors_FacultyId",
                table: "Instructors",
                column: "FacultyId");

            migrationBuilder.CreateIndex(
                name: "IX_Instructors_LecturerId",
                table: "Instructors",
                column: "LecturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Lecturers_DepartmentSubjectId",
                table: "Lecturers",
                column: "DepartmentSubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Lecturers_FacultyId",
                table: "Lecturers",
                column: "FacultyId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "Roles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Students_DepartmentSubjectId",
                table: "Students",
                column: "DepartmentSubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_FacultyId",
                table: "Students",
                column: "FacultyId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_GraduationProjectId",
                table: "Students",
                column: "GraduationProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_GraduationProjectPeriodId",
                table: "Students",
                column: "GraduationProjectPeriodId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_GraduationProjectReportId",
                table: "Students",
                column: "GraduationProjectReportId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_LecturerId",
                table: "Students",
                column: "LecturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_SyllabusId",
                table: "Students",
                column: "SyllabusId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "Users",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "Users",
                column: "NormalizedUserName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Instructors");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "GraduationProjectPeriods");

            migrationBuilder.DropTable(
                name: "GraduationProjectReports");

            migrationBuilder.DropTable(
                name: "GraduationProjects");

            migrationBuilder.DropTable(
                name: "Lecturers");

            migrationBuilder.DropTable(
                name: "Syllabi");

            migrationBuilder.DropTable(
                name: "DepartmentSubjects");

            migrationBuilder.DropTable(
                name: "Faculties");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
