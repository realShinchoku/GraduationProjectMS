

using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class ChangePasswordDto
{
    [Required]
    public string OldPassword { get; set; }
    [Required]
    [RegularExpression(@"^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}",
        ErrorMessage = "Password must be complex")]
    public string NewPassword { get; set; }
}