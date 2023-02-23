namespace Domain;

public class DepartmentSubject : AppUser
{
    public ICollection<DepartmentSubjectLecturer> Lecturers { get; set; }
    public FacultyDepartmentSubject Faculty { get; set; }
}