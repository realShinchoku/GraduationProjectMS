namespace Application.DepartmentSubjects.DTOs;

public class InstructorsGroupByPeriodDto
{
    public string PeriodId { get; set; }
    public string PeriodName { get; set; }
    public int TotalStudentNumber { get; set; }
}