namespace Domain;

public class Lecturer : AppUser
{
    public DepartmentSubjectLecturer DepartmentSubject { get; set; }
    public int InstructorStatus { get; set; }
    public ICollection<LecturerStudent> Students { get; set; }
    public int MaxStudentsNumber { get; set; }
}