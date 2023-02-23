namespace Domain;

public class Faculty : AppUser
{
    public ICollection<FacultyDepartmentSubject> DepartmentSubjects { get; set; }
}