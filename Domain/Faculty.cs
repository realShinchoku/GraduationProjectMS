namespace Domain;

public class Faculty : AppUser
{
    public ICollection<DepartmentSubject> DepartmentSubjects { get; set; }
}