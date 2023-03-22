using CsvHelper.Configuration;
using Domain;

namespace Application.Accounts.ClassMap;

public class LecturerMap : ClassMap<Lecturer>
{
    public LecturerMap()
    {
        Map(p => p.Email).Index(0);
        Map(p => p.DisplayName).Index(1);
        Map(p => p.Birthday).Index(2);
        Map(p => p.Sex).Index(3);
        Map(p => p.Education).Index(4);
        Map(p => p.MaxStudentsNumber).Index(5);
    }
}