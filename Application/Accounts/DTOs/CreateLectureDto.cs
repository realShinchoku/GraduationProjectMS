namespace Application.Accounts.DTOs;

public class CreateLectureDto
{
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public string Education { get; set; }
    public string PhoneNumber { get; set; }
    public string DepartmentSubjectId { get; set; }
}