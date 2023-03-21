using Domain;

namespace Application.Interfaces;

public interface IUserAccessor
{
    string GetUserId();
    string GetUserName();
    Role GetUserRole();
    Task<Faculty> GetFacultyAsync();
    Task<DepartmentSubject> GetDepartmentSubjectAsync();
    Task<Lecturer> GetLecturerAsync();
    Task<Student> GetStudentAsync();
}