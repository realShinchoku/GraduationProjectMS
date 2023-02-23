namespace Domain;

public class Student : AppUser
{
    public string StudentId { get; set; }
    public Lecturer Lecturer { get; set; }
    public GraduationProjectPeriod GraduationProjectPeriod { get; set; }
    public GraduationProject GraduationProject { get; set; }
    public Syllabus Syllabus { get; set; }
    public GraduationProjectReport GraduationProjectReport { get; set; }
    public decimal Point { get; set; }
}