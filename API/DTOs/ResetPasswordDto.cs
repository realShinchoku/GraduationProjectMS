using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class ResetPasswordDto
{
    [Required] public string Token { get; set; }

    [Required] public string Email { get; set; }

    [Required]
    [RegularExpression(@"^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}",
        ErrorMessage = "Password must be complex")]
    public string Password { get; set; }
}