using Application.Students;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class StudentController : BaseApiController
{
    [HttpPost("/lecturer/{id}")]
    public async Task<IActionResult> ChoseLecturer(string id)
    {
        return HandleResult(await Mediator.Send(new ChoseLecturer.Command { Id = id }));
    }
}