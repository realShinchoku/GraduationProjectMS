using Domain;

namespace Application.Interfaces;

public interface IUserAccessor
{
    string GetUserName();
    Role GetUserRole();
    Task<Faculty> Faculty();
    Task<DepartmentSubject> DepartmentSubject();
    Task<Lecturer> Lecturer();
    Task<Student> Student();
}