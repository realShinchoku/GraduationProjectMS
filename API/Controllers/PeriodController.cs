using Application.GraduationProjectPeriods;
using Application.GraduationProjectPeriods.DTOs;
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
    public async Task<IActionResult> Create(CreateDto graduationProjectPeriod)
    {
        return HandleResult(await Mediator.Send(new Create.Command { GraduationProjectPeriod = graduationProjectPeriod }));
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

    [HttpPut]
    public async Task<IActionResult> Edit(GraduationProjectPeriod period)
    {
        return HandleResult(await Mediator.Send(new Edit.Command { GraduationProjectPeriod = period }));
    }
}