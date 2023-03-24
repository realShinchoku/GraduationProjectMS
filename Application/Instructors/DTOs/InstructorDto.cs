namespace Application.Instructors.DTOs;

public class InstructorDto
{
    public Guid Id { get; set; }
    public string StudentId { get; set; }
    public string Student { get; set; }
    public string Class { get; set; }
    public string Faculty { get; set; }
    public DateTime CreatedDate { get; set; }
    public string Lecturer { get; set; }
    public bool? ApprovalStatus { get; set; }
}