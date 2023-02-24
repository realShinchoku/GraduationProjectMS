namespace Domain;

public class Student : AppUser
{
    public Lecturer Lecturer { get; set; }
    public DepartmentSubject DepartmentSubject { get; set; }
    public Faculty Faculty { get; set; }
    public GraduationProject GraduationProject { get; set; }
    public GraduationProjectPeriod GraduationProjectPeriod { get; set; }
    public GraduationProjectReport GraduationProjectReport { get; set; }
    public Syllabus Syllabus { get; set; }
    public decimal Point { get; set; }
    public string StudentId { get; set; }
}