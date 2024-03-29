using Domain;

namespace API.DTOs;

public class UserDto
{
    public string Id { get; set; }
    public string DisplayName { get; set; }
    public string Token { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public Role Role { get; set; }
}