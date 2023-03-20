using Application.Core;

namespace Application.Students;

public class StudentParams : PagingParams
{
    public Guid PeriodId { get; set; }
}