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
                },
            };
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
        }
        if (!userManager.Users.Any())
        {
            var users = new List<AppUser>
            {
                new()
                {
                    DisplayName = "Bob",
                    UserName = "bob",
                    Email = "bob@test.com",
                    Role = Role.FacultyOffice
                },
                new()
                {
                    DisplayName = "Jane",
                    UserName = "jane",
                    Email = "jane@test.com",
                },
                new()
                {
                    DisplayName = "Tom",
                    UserName = "tom",
                    Email = "tom@test.com",
                }
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, user.Role.ToString());
            }
        }
    }
}