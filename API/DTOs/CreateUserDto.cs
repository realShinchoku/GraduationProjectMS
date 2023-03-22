using System.ComponentModel.DataAnnotations;
using Domain;

namespace API.DTOs;

public class CreateUserDto
{
    [Required] [EmailAddress] public string Email { get; set; }

    [Required]
    [RegularExpression(@"^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}",
        ErrorMessage = "Password must be complex")]
    public string Password { get; set; }

    [Required] public string DisplayName { get; set; }

    [Required] public string UserName { get; set; }
    [Required] public Role Role { get; set; }
}