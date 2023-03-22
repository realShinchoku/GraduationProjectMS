using Application.Core;

namespace Application.Faculties;

public class FacultyParams : PagingParams
{
    public bool IsActive { get; set; }
}