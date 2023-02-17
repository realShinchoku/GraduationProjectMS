using Domain;
using Microsoft.AspNetCore.Identity;

namespace API.DTOs;

public class UserDto
{
    public string DisplayName { get; set; }
    public string Token { get; set; }
    public string UserName { get; set; }
    
    public Role Role { get; set; }
}