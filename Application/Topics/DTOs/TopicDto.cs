namespace Application.Topics.DTOs;

public class TopicDto
{
    public Guid Id { get; set; }
    public string StudentId { get; set; }
    public string StudentName { get; set; }
    public string Class { get; set; }
    public string Faculty { get; set; }
    public string Type { get; set; }
    public string Name { get; set; }
    public string Lecturer { get; set; }
    public bool LecturerApproval { get; set; }
    public bool DepartmentSubjectApproval { get; set; }
}