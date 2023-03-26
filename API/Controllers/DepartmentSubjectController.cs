using Application.DepartmentSubjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class DepartmentSubjectController : BaseApiController
{
    [HttpGet] //api/DepartmentSubject
    public async Task<IActionResult> GetDepartmentSubjects([FromQuery] List.DepartmentSubjectParams param)
    {
        return HandlePageResult(await Mediator.Send(new List.Query { Params = param }));
    }
}