namespace Domain;

public class DepartmentSubject : AppUser
{
    public DepartmentSubject()
    {
        Role = Role.DepartmentSubject;
    }

    public Faculty Faculty { get; set; }
    public ICollection<Lecturer> Lecturers { get; set; }
    public ICollection<Student> Students { get; set; }
}