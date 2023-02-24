namespace Domain;

public class DepartmentSubject : AppUser
{
    public Faculty Faculty { get; set; }
    public ICollection<Lecturer> Lecturers { get; set; }
    public ICollection<Student> Students { get; set; }
}