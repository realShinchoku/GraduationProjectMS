namespace Domain;

public class GraduationProjectPeriod
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Course { get; set; }
    public int Phase { get; set; }
    public bool LecturerApproval { get; set; }
    public bool DepartmentSubjectApproval { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime ContactInstructorTime { get; set; }
    public DateTime RegisterTopicTime { get; set; }
    public DateTime SyllabusSubmissionTime { get; set; }
    public DateTime SyllabusReviewTime { get; set; }
    public DateTime GraduationProjectTime { get; set; }
    public DateTime ProtectionTime { get; set; }
    public ICollection<Student> Students { get; set; }
    public ICollection<Syllabus> Syllabi { get; set; }
    public ICollection<GraduationProject> Projects { get; set; }
    public Faculty Faculty { get; set; }
}