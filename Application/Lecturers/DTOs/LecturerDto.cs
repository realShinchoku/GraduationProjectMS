namespace Application.Lecturers.DTOs;

public class LecturerDto
{
    public string Id { get; set; }
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public DateTime Birthday { get; set; }
    public string Bio { get; set; }
    public bool Sex { get; set; }
    public int InstructorStatus { get; set; }
    public string PhoneNumber { get; set; }
    public int StudentCount { get; set; }
    public int MaxStudentsNumber { get; set; }
    public string Education { get; set; }
    public string DepartmentSubjects { get; set; }
    public string Faculty { get; set; }
}