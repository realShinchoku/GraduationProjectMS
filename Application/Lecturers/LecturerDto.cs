using System.Diagnostics.CodeAnalysis;

namespace Application.Lecturers;

public class LecturerDto
{
    public string Id { get; set; }
    public string DisplayName { get; set; }
    public bool Sex { get; set; }
    public DateTime Birthday { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}