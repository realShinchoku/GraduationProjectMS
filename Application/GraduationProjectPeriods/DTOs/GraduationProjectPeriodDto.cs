using Application.Students.DTOs;

namespace Application.GraduationProjectPeriods.DTOs;

public class GraduationProjectPeriodDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime ContactInstructorTime { get; set; }
    public DateTime RegisterTopicTime { get; set; }
    public DateTime SyllabusSubmissionTime { get; set; }
    public DateTime SyllabusReviewTime { get; set; }
    public DateTime GraduationProjectTime { get; set; }
    public DateTime ProtectionTime { get; set; }
    public int StudentsCount { get; set; }
    public int SyllabiCount{ get; set; }
    public int ClassesCount { get; set; }
}