namespace Domain;

public class LecturerStudent
{
    public Student Student { get; set; }
    public Lecturer Lecturer { get; set; }
    public string LecturerId { get; set; }
    public string StudentId { get; set; }
}