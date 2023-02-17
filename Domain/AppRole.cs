using System.ComponentModel;
using Microsoft.AspNetCore.Identity;

namespace Domain;

public class AppRole : IdentityRole
{
    public string DisplayName => GetDescription();
    public Role RoleId { get; set; }
    private string GetDescription()
    {
        var description = RoleId.ToString();
        var fieldInfo = RoleId.GetType().GetField(RoleId.ToString());

        if (fieldInfo != null)
        {
            var attrs = fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), true);
            if (attrs.Length > 0)
            {
                description = ((DescriptionAttribute)attrs[0]).Description;
            }
        }
        return description;
    }
}

public enum Role
{
    [Description("Văn phòng khoa")]
    FacultyOffice = 0,
    [Description("Bộ môn")]
    DepartmentSubjects = 1,
    [Description("Giảng viên")]
    Lecturer = 2,
    [Description("Sinh viên")]
    Student = 3,
}

