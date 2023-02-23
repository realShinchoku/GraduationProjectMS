using Domain;
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
    // public DbSet<FacultyDepartmentSubject> FacultyDepartmentSubjects { get; set; }
    // public DbSet<DepartmentSubjectLecturer> DepartmentSubjectLecturers { get; set; }
    // public DbSet<LecturerStudent> LecturerStudents { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // builder.Entity<FacultyDepartmentSubject>(x => x.HasKey(k => new { k.DepartmentSubjectId, k.FacultyId }));
        // builder.Entity<FacultyDepartmentSubject>().HasOne(f => f.Faculty).WithMany(ds => ds.DepartmentSubjects)
        //     .HasForeignKey(f => f.FacultyId);
        // builder.Entity<FacultyDepartmentSubject>().HasOne(ds => ds.DepartmentSubject).WithOne(f => f.Faculty);
        //
        // builder.Entity<DepartmentSubjectLecturer>(x => x.HasKey(k => new { k.DepartmentSubjectId, k.LecturerId }));
        // builder.Entity<DepartmentSubjectLecturer>().HasOne(ds => ds.DepartmentSubject).WithMany(l => l.Lecturers)
        //     .HasForeignKey(ds => ds.DepartmentSubjectId);
        // builder.Entity<DepartmentSubjectLecturer>().HasOne(l => l.Lecturer).WithOne(ds => ds.DepartmentSubject);
        //
        // builder.Entity<LecturerStudent>(x => x.HasKey(k => new { k.StudentId, k.LecturerId }));
        // builder.Entity<LecturerStudent>().HasOne(l => l.Lecturer).WithMany(l => l.Students)
        //     .HasForeignKey(ds => ds.LecturerId);
        // builder.Entity<LecturerStudent>().HasOne(s => s.Student).WithOne(l => l.Lecturer);
        
    }
}