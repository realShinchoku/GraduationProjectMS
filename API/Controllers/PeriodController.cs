using Application.Core;
using Application.GraduationProjectPeriods;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Single = Application.GraduationProjectPeriods.Single;

namespace API.Controllers;

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

    [HttpGet]
    public async Task<IActionResult> List([FromQuery] List.PeriodParams pagingParams)
    {
        return HandlePageResult(await Mediator.Send(new List.Query { Params = pagingParams }));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Single(Guid id)
    {
        return HandleResult(await Mediator.Send(new Single.Query { Id = id }));
    }
}