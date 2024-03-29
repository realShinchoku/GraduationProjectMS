namespace Domain;

public class Instructor
{
    public Guid Id { get; set; }
    public GraduationProjectPeriod GraduationProjectPeriod { get; set; }
    public Student Student { get; set; }
    public Lecturer Lecturer { get; set; }
    public DepartmentSubject DepartmentSubject { get; set; }
    public bool IsApproval { get; set; }
    public bool? ApprovalStatus { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public string Note { get; set; }
}