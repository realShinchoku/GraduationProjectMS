using Domain;

namespace API.DTOs;

public class UserDto
{
    public string DisplayName { get; set; }
    public string Token { get; set; }
    public string UserName { get; set; }
    public bool Sex { get; set; }
    public DateTime? Birthday { get; set; }
    public Role Role { get; set; }
}