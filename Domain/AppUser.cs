using Microsoft.AspNetCore.Identity;

namespace Domain;

public class AppUser : IdentityUser
{
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime? Birthday { get; set; }
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    public Role Role { get; set; } = Role.Student;
    public bool Sex { get; set; }
    public string DisplayName { get; set; }
}