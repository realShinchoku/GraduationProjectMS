using Application.Instructors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class InstructorController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> List([FromQuery] List.InstructorParams pagingParams)
    {
        return HandlePageResult(await Mediator.Send(new List.Query { Params = pagingParams }));
    }

    [Authorize(Policy = "IsDepartmentSubjects")]
    [HttpPost("assign")]
    public async Task<IActionResult> AssignLecturer(Assign.Command command)
    {
        return HandleResult(await Mediator.Send(command));
    }

    [Authorize(Policy = "IsDepartmentSubjects")]
    [HttpPost("approval/{id}")]
    public async Task<IActionResult> ApprovalLecturer(Guid id, [FromBody] bool status)
    {
        return HandleResult(await Mediator.Send(new Approval.Command { InstructorId = id, Status = status }));
    }

    [Authorize(Policy = "IsStudent")]
    [HttpPost("chose/{id}")]
    public async Task<IActionResult> ChoseLecturer(string id)
    {
        return HandleResult(await Mediator.Send(new Chose.Command { Id = id }));
    }
}