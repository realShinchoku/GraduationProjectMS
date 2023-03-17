using Application.Core;

namespace Application.Lecturers;

public class LecturerParams : PagingParams
{
    public int? Status { get; set; }
    public string DepartmentSubjectId { get; set; }
    public string Keyword { get; set; }
}