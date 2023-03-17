using Application.Lecturers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class LecturerController : BaseApiController
{
    [HttpGet] //api/lecturer
    public async Task<IActionResult> GetLecturers([FromQuery] LecturerParams param)
    {
        return HandlePageResult(await Mediator.Send(new List.Query { Params = param }));
    }
}