namespace Application.Faculties.DTOs;

public class FacultyDto
{
    public string Id { get; set; }
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public bool Sex { get; set; }
    public DateTime Birthday { get; set; }
    public string PhoneNumber { get; set; }
    public int DepartmentSubjectCount { get; set; }
    public int LecturerCount { get; set; }
    public int StudentCount { get; set; }
    public int Status { get; set; }
    public string Bio { get; set; }
}