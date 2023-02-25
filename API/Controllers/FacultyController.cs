using Application.Faculties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class FacultyController : BaseApiController
{
    [HttpGet] //api/lecturer
    public async Task<IActionResult> GetFaculty([FromQuery] FacultyParams param)
    {
        return HandlePageResult(await Mediator.Send(new List.Query { Params = param }));
    }
}