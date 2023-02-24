using Application.Faculty;
using Application.GraduationProjectPeriods;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Authorize]
public class PeriodController : BaseApiController
{
    [HttpPost] //api/period
    [Authorize(Policy = "IsFacultyOffice")]
    public async Task<IActionResult> Create(GraduationProjectPeriod graduationProjectPeriod)
    {
        return HandleResult(
            await Mediator.Send(new Create.Command { GraduationProjectPeriod = graduationProjectPeriod }));
    }
}