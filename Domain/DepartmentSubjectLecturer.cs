namespace Domain;

public class DepartmentSubjectLecturer
{
    public DepartmentSubject DepartmentSubject { get; set; }
    public Lecturer Lecturer { get; set; }
    public string LecturerId { get; set; }
    public string DepartmentSubjectId { get; set; }
}