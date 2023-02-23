namespace Domain;

public class FacultyDepartmentSubject
{
    public Faculty Faculty { get; set; }
    public DepartmentSubject DepartmentSubject { get; set; }
    public string FacultyId { get; set; }
    public string DepartmentSubjectId { get; set; }
}