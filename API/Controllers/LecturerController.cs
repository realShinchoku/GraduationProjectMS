using Application.Lecturers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Authorize]
public class LecturerController: BaseApiController
{
    [HttpGet] //api/lecturer
    public async Task<IActionResult> GetActivities([FromQuery] LecturerParams param)
    {
        return HandlePageResult(await Mediator.Send(new List.Query { Params = param }));
    }
    
    // [HttpGet] //api/lecturer
    // public async Task<IActionResult> GetActivities()
    // {
    //     return HandlePageResult(await Mediator.Send(new List.Query()));
    // }
}