using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class Seed
{
    public static async Task SeedData(DataContext context,
        UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        if (!roleManager.Roles.Any())
        {
            var roles = new List<AppRole>
            {
                new()
                {
                    RoleId = Role.FacultyOffice,
                    Name = Role.FacultyOffice.ToString()
                },
                new()
                {
                    RoleId = Role.DepartmentSubjects,
                    Name = Role.DepartmentSubjects.ToString()
                },
                new()
                {
                    RoleId = Role.Lecturer,
                    Name = Role.Lecturer.ToString()
                },
                new()
                {
                    RoleId = Role.Student,
                    Name = Role.Student.ToString()
                }
            };
            foreach (var role in roles) await roleManager.CreateAsync(role);
        }

        if (!userManager.Users.Any())
        {
            var users = new List<AppUser>
            {
                new()
                {
                    DisplayName = "Văn phòng khoa 1",
                    UserName = "vpk1",
                    Email = "vpk1@test.com",
                    Role = Role.FacultyOffice
                },
                new()
                {
                    DisplayName = "Văn phòng khoa 2",
                    UserName = "vpk2",
                    Email = "vpk2@test.com",
                    Role = Role.FacultyOffice
                },
                new()
                {
                    DisplayName = "Bộ môn 1",
                    UserName = "bm",
                    Email = "bm1@test.com",
                    Role = Role.DepartmentSubjects
                },
                new()
                {
                    DisplayName = "Bộ môn 2",
                    UserName = "bm2",
                    Email = "bm2@test.com",
                    Role = Role.DepartmentSubjects
                },
                new()
                {
                    DisplayName = "Bộ môn 3",
                    UserName = "bm3",
                    Email = "bm3@test.com",
                    Role = Role.DepartmentSubjects
                },
                new()
                {
                    DisplayName = "Giảng viên 1",
                    UserName = "gv1",
                    Email = "gv1@test.com",
                    Role = Role.Lecturer
                },
                new()
                {
                    DisplayName = "Giảng viên 2",
                    UserName = "gv2",
                    Email = "gv2@test.com",
                    Role = Role.Lecturer
                },
                new()
                {
                    DisplayName = "Giảng viên 3",
                    UserName = "gv3",
                    Email = "gv3@test.com",
                    Role = Role.Lecturer
                },
                new()
                {
                    DisplayName = "Giảng viên 4",
                    UserName = "gv4",
                    Email = "gv4@test.com",
                    Role = Role.Lecturer
                },
                new()
                {
                    DisplayName = "Sinh viên 1",
                    UserName = "sv1",
                    Email = "sv1@test.com"
                },
                new()
                {
                    DisplayName = "Sinh viên 2",
                    UserName = "sv2",
                    Email = "sv2@test.com"
                },
                new()
                {
                    DisplayName = "Sinh viên 3",
                    UserName = "sv3",
                    Email = "sv3@test.com"
                },
                new()
                {
                    DisplayName = "Sinh viên 4",
                    UserName = "sv4",
                    Email = "sv4@test.com"
                },
                new()
                {
                    DisplayName = "Sinh viên 5",
                    UserName = "sv5",
                    Email = "sv5@test.com"
                }
            };
            var use = new Student
            {
                UserName = null,
                Email = null,
                EmailConfirmed = false,
                PhoneNumber = null,
                DisplayName = null,
                CreatedDate = default,
                Role = Role.Student,
                Sex = false,
                Birthday = null,
                StudentId = null,
                Lecturer = null,
                GraduationProjectPeriod = null,
                Point = 0
            };
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, user.Role.ToString());
            }
        }
    }
}