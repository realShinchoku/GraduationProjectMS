using Application.Core;

namespace Application.Students;

public class StudentParams : PagingParams
{
    public Guid PeriodId { get; set; }
    public bool? HasLecturer { get; set; }
    public bool? HasTopic { get; set; }
}