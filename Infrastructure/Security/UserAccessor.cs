using System.Security.Claims;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class UserAccessor : IUserAccessor
{
    private readonly DataContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserAccessor(IHttpContextAccessor httpContextAccessor, DataContext context)
    {
        _httpContextAccessor = httpContextAccessor;
        _context = context;
    }

    public string GetUserName()
    {
        return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
    }

    public Role GetUserRole()
    {
        var r = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);
        Enum.TryParse(r, out Role role);
        return role;
    }

    public Faculty Faculty()
    {
        var query = _context.Faculties.AsQueryable();
        query = GetUserRole() switch
        {
            Role.FacultyOffice => query.Where(x => x.UserName == GetUserName()),
            Role.DepartmentSubject => query.Include(ds => ds.DepartmentSubjects)
                .Where(x => x.DepartmentSubjects.Any(ds => ds.UserName == GetUserName())),
            Role.Lecturer => query.Include(l => l.Lecturers)
                .Where(x => x.Lecturers.Any(l => l.UserName == GetUserName())),
            Role.Student => query.Include(s => s.Students)
                .Where(x => x.Students.Any(s => s.UserName == GetUserName())),
            _ => throw new ArgumentOutOfRangeException()
        };
        return query.FirstOrDefault();
    }

    public DepartmentSubject DepartmentSubject()
    {
        var query = _context.DepartmentSubjects.AsQueryable();
        query = GetUserRole() switch
        {
            Role.FacultyOffice => query.Where(x => x.Faculty.UserName == GetUserName()),
            Role.DepartmentSubject => query.Where(x => x.UserName == GetUserName()),
            Role.Lecturer => query.Include(l => l.Lecturers)
                .Where(x => x.Lecturers.Any(l => l.UserName == GetUserName())),
            Role.Student => query.Include(s => s.Students)
                .Where(x => x.Students.Any(s => s.UserName == GetUserName())),
            _ => throw new ArgumentOutOfRangeException()
        };
        return query.FirstOrDefault();
    }

    public Lecturer Lecturer()
    {
        var query = _context.Lecturers.AsQueryable();
        query = GetUserRole() switch
        {
            Role.FacultyOffice => query.Where(x => x.Faculty.UserName == GetUserName()),
            Role.DepartmentSubject => query.Where(x => x.DepartmentSubject.UserName == GetUserName()),
            Role.Lecturer => query.Where(x => x.UserName == GetUserName()),
            Role.Student => query.Include(s => s.Students)
                .Where(x => x.Students.Any(s => s.UserName == GetUserName())),
            _ => throw new ArgumentOutOfRangeException()
        };
        return query.FirstOrDefault();
    }

    public Student Student()
    {
        var query = _context.Students.AsQueryable();
        query = GetUserRole() switch
        {
            Role.FacultyOffice => query.Where(x => x.Faculty.UserName == GetUserName()),
            Role.DepartmentSubject => query.Where(x => x.DepartmentSubject.UserName == GetUserName()),
            Role.Lecturer => query.Where(x => x.Lecturer.UserName == GetUserName()),
            Role.Student => query.Where(x => x.UserName == GetUserName()),
            _ => throw new ArgumentOutOfRangeException()
        };
        return query.FirstOrDefault();
    }
}