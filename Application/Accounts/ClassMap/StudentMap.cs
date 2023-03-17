using CsvHelper.Configuration;
using Domain;

namespace Application.Accounts.ClassMap;

public sealed class StudentMap : ClassMap<Student>
{
    public StudentMap()
    {
        Map(p => p.StudentId).Index(0);
        Map(p => p.Email).Index(1);
        Map(p => p.DisplayName).Index(2);
        Map(p => p.Birthday).Index(3);
        Map(p => p.Sex).Index(4);
    }
}