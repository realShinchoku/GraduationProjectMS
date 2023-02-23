namespace Domain;

public class DepartmentSubject : AppUser
{
    public ICollection<Lecturer> Lecturers { get; set; }
    public Faculty Faculty { get; set; }
    public string GetFacultyName()
    {
        return Faculty.DisplayName;
    }
}