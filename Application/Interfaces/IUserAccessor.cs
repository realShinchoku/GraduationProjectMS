using Domain;

namespace Application.Interfaces;

public interface IUserAccessor
{
    string GetUserName();
    Role GetUserRole();
    Faculty Faculty();
    DepartmentSubject DepartmentSubject();
    Lecturer Lecturer();
    Student Student();
}