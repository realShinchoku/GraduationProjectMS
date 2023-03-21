namespace Application.Students.DTOs;

public class StudentDto
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string DisplayName { get; set; }
    public string StudentId { get; set; }
    public DateTime Birthday { get; set; }
    public bool Sex { get; set; }
    public string Bio { get; set; }
    public decimal Point { get; set; }
    public string PhoneNumber { get; set; }
    public string GraduationProjectPeriod { get; set; }
    public string GraduationProject { get; set; }
    public string GraduationProjectReport { get; set; }
    public string Syllabus { get; set; }
    public string Lecturer { get; set; }
    public string DepartmentSubjects { get; set; }
    public string Faculty { get; set; }
    public string Class { get; set; }
}