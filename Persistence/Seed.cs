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
            var faculties = new List<Faculty>
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
                }
            };
            var departmentSubjects = new List<DepartmentSubject>
            {
                new()
                {
                    DisplayName = "Bộ môn 1",
                    UserName = "bm1",
                    Email = "bm1@test.com",
                    Role = Role.DepartmentSubjects,
                    Faculty = faculties[0]
                },
                new()
                {
                    DisplayName = "Bộ môn 2",
                    UserName = "bm2",
                    Email = "bm2@test.com",
                    Role = Role.DepartmentSubjects,
                    Faculty = faculties[0]
                },
                new()
                {
                    DisplayName = "Bộ môn 3",
                    UserName = "bm3",
                    Email = "bm3@test.com",
                    Role = Role.DepartmentSubjects,
                    Faculty = faculties[0]
                },
                new()
                {
                    DisplayName = "Bộ môn 4",
                    UserName = "bm4",
                    Email = "bm4@test.com",
                    Role = Role.DepartmentSubjects,
                    Faculty = faculties[1]
                },
                new()
                {
                    DisplayName = "Bộ môn 5",
                    UserName = "bm5",
                    Email = "bm5@test.com",
                    Role = Role.DepartmentSubjects,
                    Faculty = faculties[1]
                },
                new()
                {
                    DisplayName = "Bộ môn 6",
                    UserName = "bm6",
                    Email = "bm6@test.com",
                    Role = Role.DepartmentSubjects,
                    Faculty = faculties[1]
                }
            };

            var lecturers = new List<Lecturer>
            {
                new()
                {
                    DisplayName = "Giảng viên 1",
                    UserName = "gv1",
                    Email = "gv1@test.com",
                    Role = Role.Lecturer,
                    DepartmentSubject = departmentSubjects[0],
                    Faculty = departmentSubjects[0].Faculty
                },
                new()
                {
                    DisplayName = "Giảng viên 2",
                    UserName = "gv2",
                    Email = "gv2@test.com",
                    Role = Role.Lecturer,
                    DepartmentSubject = departmentSubjects[0],
                    Faculty = departmentSubjects[0].Faculty
                },
                new()
                {
                    DisplayName = "Giảng viên 3",
                    UserName = "gv3",
                    Email = "gv3@test.com",
                    Role = Role.Lecturer,
                    DepartmentSubject = departmentSubjects[1],
                    Faculty = departmentSubjects[1].Faculty
                },
                new()
                {
                    DisplayName = "Giảng viên 4",
                    UserName = "gv4",
                    Email = "gv4@test.com",
                    Role = Role.Lecturer,
                    DepartmentSubject = departmentSubjects[1],
                    Faculty = departmentSubjects[1].Faculty
                },
                new()
                {
                    DisplayName = "Giảng viên 5",
                    UserName = "gv5",
                    Email = "gv5@test.com",
                    Role = Role.Lecturer,
                    DepartmentSubject = departmentSubjects[2],
                    Faculty = departmentSubjects[2].Faculty
                },
                new()
                {
                    DisplayName = "Giảng viên 6",
                    UserName = "gv6",
                    Email = "gv6@test.com",
                    Role = Role.Lecturer,
                    DepartmentSubject = departmentSubjects[2],
                    Faculty = departmentSubjects[2].Faculty
                },
                new()
                {
                    DisplayName = "Giảng viên 7",
                    UserName = "gv7",
                    Email = "gv7@test.com",
                    Role = Role.Lecturer,
                    DepartmentSubject = departmentSubjects[3],
                    Faculty = departmentSubjects[3].Faculty
                },
                new()
                {
                    DisplayName = "Giảng viên 8",
                    UserName = "gv8",
                    Email = "gv8@test.com",
                    Role = Role.Lecturer,
                    DepartmentSubject = departmentSubjects[3],
                    Faculty = departmentSubjects[3].Faculty
                },
                new()
                {
                    DisplayName = "Giảng viên 9",
                    UserName = "gv9",
                    Email = "gv9@test.com",
                    Role = Role.Lecturer,
                    DepartmentSubject = departmentSubjects[4],
                    Faculty = departmentSubjects[4].Faculty
                },
                new()
                {
                    DisplayName = "Giảng viên 10",
                    UserName = "gv10",
                    Email = "gv10@test.com",
                    Role = Role.Lecturer,
                    DepartmentSubject = departmentSubjects[4],
                    Faculty = departmentSubjects[4].Faculty
                },
                new()
                {
                    DisplayName = "Giảng viên 11",
                    UserName = "gv11",
                    Email = "gv11@test.com",
                    Role = Role.Lecturer,
                    DepartmentSubject = departmentSubjects[5],
                    Faculty = departmentSubjects[5].Faculty
                },
                new()
                {
                    DisplayName = "Giảng viên 12",
                    UserName = "gv12",
                    Email = "gv12@test.com",
                    Role = Role.Lecturer,
                    DepartmentSubject = departmentSubjects[5],
                    Faculty = departmentSubjects[5].Faculty
                }
            };
            var students = new List<Student>
            {
                new()
                {
                    DisplayName = "Sinh viên 1",
                    UserName = "sv1",
                    Email = "sv1@test.com",
                    Lecturer = lecturers[0],
                    DepartmentSubject = lecturers[0].DepartmentSubject,
                    Faculty = lecturers[0].Faculty
                },
                new()
                {
                    DisplayName = "Sinh viên 2",
                    UserName = "sv2",
                    Email = "sv2@test.com",
                    Lecturer = lecturers[0],
                    DepartmentSubject = lecturers[0].DepartmentSubject,
                    Faculty = lecturers[0].Faculty
                },
                new()
                {
                    DisplayName = "Sinh viên 3",
                    UserName = "sv3",
                    Email = "sv3@test.com",
                    Lecturer = lecturers[0],
                    DepartmentSubject = lecturers[0].DepartmentSubject,
                    Faculty = lecturers[0].Faculty
                },
                new()
                {
                    DisplayName = "Sinh viên 4",
                    UserName = "sv4",
                    Email = "sv4@test.com",
                    Lecturer = lecturers[1],
                    DepartmentSubject = lecturers[1].DepartmentSubject,
                    Faculty = lecturers[1].Faculty
                },
                new()
                {
                    DisplayName = "Sinh viên 5",
                    UserName = "sv5",
                    Email = "sv5@test.com",
                    Lecturer = lecturers[1],
                    DepartmentSubject = lecturers[1].DepartmentSubject,
                    Faculty = lecturers[1].Faculty
                },
                new()
                {
                    DisplayName = "Sinh viên 6",
                    UserName = "sv6",
                    Email = "sv6@test.com",
                    Lecturer = lecturers[1],
                    DepartmentSubject = lecturers[1].DepartmentSubject,
                    Faculty = lecturers[1].Faculty
                },
                new()
                {
                    DisplayName = "Sinh viên 7",
                    UserName = "sv7",
                    Email = "sv7@test.com",
                    Lecturer = lecturers[1],
                    DepartmentSubject = lecturers[1].DepartmentSubject,
                    Faculty = lecturers[1].Faculty
                },
                new()
                {
                    DisplayName = "Sinh viên 8",
                    UserName = "sv8",
                    Email = "sv8@test.com"
                },
                new()
                {
                    DisplayName = "Sinh viên 9",
                    UserName = "sv9",
                    Email = "sv9@test.com"
                },
                new()
                {
                    DisplayName = "Sinh viên 10",
                    UserName = "sv10",
                    Email = "sv10@test.com"
                },
                new()
                {
                    DisplayName = "1951060778",
                    UserName = "1951060778",
                    Email = "1951060778@e.tlu.edu.vn",
                    Lecturer = lecturers[1],
                    DepartmentSubject = lecturers[1].DepartmentSubject,
                    Faculty = lecturers[1].Faculty
                },
            };

            foreach (var user in faculties)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, user.Role.ToString());
            }

            foreach (var user in departmentSubjects)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, user.Role.ToString());
            }

            foreach (var user in lecturers)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, user.Role.ToString());
            }

            foreach (var user in students)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, user.Role.ToString());
            }
        }
    }
}