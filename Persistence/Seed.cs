using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class Seed
{
    public static async Task SeedData(DataContext context,
        UserManager<AppUser> userManager)
    {
        if (!userManager.Users.Any())
        {
            var users = new List<AppUser>
            {
                new()
                {
                    DisplayName = "Bob",
                    UserName = "bob",
                    Email = "bob@test.com",
                    EmailConfirmed = true
                },
                new()
                {
                    DisplayName = "Jane",
                    UserName = "jane",
                    Email = "jane@test.com",
                    EmailConfirmed = true
                },
                new()
                {
                    DisplayName = "Tom",
                    UserName = "tom",
                    Email = "tom@test.com",
                    EmailConfirmed = true
                }
            };

            foreach (var user in users) await userManager.CreateAsync(user, "Pa$$w0rd");
        }
    }
}