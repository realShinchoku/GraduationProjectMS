namespace Application.GraduationProjectPeriods.DTOs;

public class CreateDto
{
    public int Course { get; set; }
    public int Phase { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime ContactInstructorTime { get; set; }
    public DateTime RegisterTopicTime { get; set; }
    public DateTime SyllabusSubmissionTime { get; set; }
    public DateTime SyllabusReviewTime { get; set; }
    public DateTime GraduationProjectTime { get; set; }
    public DateTime ProtectionTime { get; set; }
}