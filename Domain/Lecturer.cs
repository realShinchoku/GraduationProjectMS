namespace Domain;

public class Lecturer : AppUser
{
    public DepartmentSubject DepartmentSubject { get; set; }
    public int InstructorStatus { get; set; }
    public ICollection<Student> Students { get; set; }
    public int MaxStudentsNumber { get; set; }
    public string GetDepartmentSubjectName()
    {
        return DepartmentSubject.DisplayName;
    }
    
    public string GetFacultyName()
    {
        return DepartmentSubject.GetFacultyName();
    }
}