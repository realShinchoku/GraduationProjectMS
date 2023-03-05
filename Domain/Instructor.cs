namespace Domain;

public class Instructor
{
    public string StudentId { get; set; }
    public string LecturerId { get; set; }
    public string DepartmentSubjectId { get; set; }
    public Student Student { get; set; }
    public Lecturer Lecturer { get; set; }
    public DepartmentSubject DepartmentSubject { get; set; }
    public bool IsConfirm { get; set; }
    public bool IsRead { get; set; }
}