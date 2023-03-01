using Application.Faculties;
using Application.Faculties.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class FacultyController : BaseApiController
{
    [Authorize(Policy = "IsFacultyOffice")]
    [HttpPost("lecturer/assign")] //api/faculty
    public async Task<IActionResult> AssignLecturer(IdsDto ids)
    {
        return HandleResult(await Mediator.Send(new AssignLecturer.Command { Ids = ids }));
    }

    [Authorize(Policy = "IsFacultyOffice")]
    [HttpPost("lecturer/confirm")] //api/faculty
    public async Task<IActionResult> ConfirmLecturer(IdsDto ids)
    {
        return HandleResult(await Mediator.Send(new ConfirmLecturer.Command { Ids = ids }));
    }
}