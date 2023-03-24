using Application.FilterItems;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class FilterItemsController : BaseApiController
{
    [HttpGet("departmentSubject")]
    public async Task<IActionResult> DepartmentSubjects()
    {
        return HandleResult(await Mediator.Send(new DepartmentSubjects.Query()));
    }
    
    [HttpGet("phase")]
    public async Task<IActionResult> Phases([FromQuery] int? course)
    {
        return HandleResult(await Mediator.Send(new Phases.Query{Course = course}));
    }
    [HttpGet("course")]
    public async Task<IActionResult> Courses()
    {
        return HandleResult(await Mediator.Send(new Courses.Query()));
    }
}