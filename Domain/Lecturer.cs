namespace Domain;

public class Lecturer : AppUser
{
    public DepartmentSubject DepartmentSubject { get; set; }
    public Faculty Faculty { get; set; }
    public ICollection<Student> Students { get; set; }
    public int InstructorStatus { get; set; }
    public int MaxStudentsNumber { get; set; }
    public string Education { get; set; }
}