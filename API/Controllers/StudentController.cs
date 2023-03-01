using Application.Students;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class StudentController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> List([FromQuery] StudentParams studentParams)
    {
        return HandlePageResult(await Mediator.Send(new List.Query { Params = studentParams }));
    }

    [Authorize(Policy = "IsStudent")]
    [HttpPost("lecturer/{id}")]
    public async Task<IActionResult> ChoseLecturer(string id)
    {
        return HandleResult(await Mediator.Send(new ChoseLecturer.Command { Id = id }));
    }

    [Authorize(Policy = "IsStudent")]
    [HttpPost("lecturer/confirm")]
    public async Task<IActionResult> ConfirmLecturer()
    {
        return HandleResult(await Mediator.Send(new ConfirmLecturer.Command()));
    }
}