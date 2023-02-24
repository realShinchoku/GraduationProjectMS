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

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Student>().ToTable("Students",
            tableBuilder => tableBuilder.Property(s => s.Id).HasColumnName("UserId"));
        builder.Entity<Lecturer>().ToTable("Lecturers",
            tableBuilder => tableBuilder.Property(l => l.Id).HasColumnName("UserId"));
        builder.Entity<DepartmentSubject>().ToTable("DepartmentSubjects",
            tableBuilder => tableBuilder.Property(ds => ds.Id).HasColumnName("UserId"));
        builder.Entity<Faculty>().ToTable("Faculties",
            tableBuilder => tableBuilder.Property(f => f.Id).HasColumnName("UserId"));
    }
}