using Microsoft.AspNetCore.Identity;

namespace Domain;

public class AppUser : IdentityUser
{
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime? Birthday { get; set; }
    public Role Role { get; set; }
    public bool Sex { get; set; }
    public string DisplayName { get; set; }
    public string Avatar { get; set; }
}