using Application.DepartmentSubjects;
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
}