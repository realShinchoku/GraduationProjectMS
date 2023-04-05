namespace Domain;

public class GraduationProject
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public string Description { get; set; }
    public bool LecturerApproval { get; set; }
    public bool DepartmentSubjectApproval { get; set; }
}