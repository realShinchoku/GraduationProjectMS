using Application.DepartmentSubjects;
using Application.DepartmentSubjects.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class DepartmentSubjectController : BaseApiController
{
    [HttpGet("listForFilter")]
    public async Task<IActionResult> ListForFilter()
    {
        return HandleResult(await Mediator.Send(new ListForFilter.Query()));
    }

    [Authorize(Policy = "IsDepartmentSubjects")]
    [HttpPost("lecturer/assign")] //api/faculty
    public async Task<IActionResult> AssignLecturer(IdsDto ids)
    {
        return HandleResult(await Mediator.Send(new AssignLecturer.Command { Ids = ids }));
    }

    [Authorize(Policy = "IsDepartmentSubjects")]
    [HttpPost("lecturer/confirm")] //api/faculty
    public async Task<IActionResult> ConfirmLecturer(IdsDto ids)
    {
        return HandleResult(await Mediator.Send(new ConfirmLecturer.Command { Ids = ids }));
    }
}