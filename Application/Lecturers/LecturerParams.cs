using Application.Core;

namespace Application.Lecturers;

public class LecturerParams : PagingParams
{
    public bool IsActive { get; set; }
}