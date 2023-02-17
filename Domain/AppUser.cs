using Microsoft.AspNetCore.Identity;

namespace Domain;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public Role Role { get; set; } = Role.Student;
}