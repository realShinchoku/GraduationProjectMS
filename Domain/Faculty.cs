namespace Domain;

public class Faculty : AppUser
{
    public Faculty()
    {
        Role = Role.FacultyOffice;
    }

    public ICollection<DepartmentSubject> DepartmentSubjects { get; set; }
    public ICollection<Lecturer> Lecturers { get; set; }
    public ICollection<Student> Students { get; set; }
}