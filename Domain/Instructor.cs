namespace Domain;

public class Instructor
{
    public string StudentId { get; set; }
    public string LecturerId { get; set; }
    public string FacultyId { get; set; }
    public Student Student { get; set; }
    public Lecturer Lecturer { get; set; }
    public Faculty Faculty { get; set; }
    public bool IsConfirm { get; set; }
    public bool IsRead { get; set; }
}