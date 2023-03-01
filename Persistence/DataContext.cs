using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<AppUser, AppRole, string>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Lecturer> Lecturers { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<DepartmentSubject> DepartmentSubjects { get; set; }
    public DbSet<Faculty> Faculties { get; set; }
    public DbSet<GraduationProject> GraduationProjects { get; set; }
    public DbSet<GraduationProjectPeriod> GraduationProjectPeriods { get; set; }
    public DbSet<GraduationProjectReport> GraduationProjectReports { get; set; }
    public DbSet<Syllabus> Syllabi { get; set; }
    public DbSet<Instructor> Instructors { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Ignore<IdentityUserClaim<string>>();
        builder.Ignore<IdentityUserLogin<string>>();
        builder.Ignore<IdentityUserToken<string>>();
        builder.Ignore<IdentityRoleClaim<string>>();

        builder.Entity<Student>().ToTable("Students");
        builder.Entity<Lecturer>().ToTable("Lecturers");
        builder.Entity<DepartmentSubject>().ToTable("DepartmentSubjects");
        builder.Entity<Faculty>().ToTable("Faculties");

        builder.Entity<Instructor>(i => i.HasKey(x => new { x.StudentId, x.FacultyId, x.LecturerId }));
    }
}