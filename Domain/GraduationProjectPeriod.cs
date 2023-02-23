namespace Domain;

public class GraduationProjectPeriod
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime ContactInstructorTime { get; set; }
    public DateTime RegisterTopicTime { get; set; }
    public DateTime SyllabusSubmissionTime { get; set; }
    public DateTime SyllabusReviewTime { get; set; }
    public DateTime GraduationProjectTime { get; set; }
    public DateTime ProtectionTime { get; set; }
    public ICollection<Student> Students { get; set; }
}