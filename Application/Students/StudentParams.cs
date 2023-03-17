using Application.Core;

namespace Application.Students;

public class StudentParams : PagingParams
{
    public bool IsActive { get; set; }
}