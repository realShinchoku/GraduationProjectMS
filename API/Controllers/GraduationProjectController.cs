using Application.Topics;
using Application.Topics.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class GraduationProjectController : BaseApiController
{
    [HttpPost]
    [Authorize(Policy = "IsStudent")]
    public async Task<IActionResult> CreateTopic(CreateDto graduationProject)
    {
        return HandleResult(await Mediator.Send(new Create.Command { GraduationProject = graduationProject }));
    }

    [HttpPut]
    [Authorize(Policy = "IsStudent")]
    public async Task<IActionResult> EditTopic(GraduationProject graduationProject)
    {
        return HandleResult(await Mediator.Send(new Edit.Command { GraduationProject = graduationProject }));
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "IsStudent")]
    public async Task<IActionResult> Get(string id)
    {
        return HandleResult(await Mediator.Send(new Get.Query { Id = id }));
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> List([FromQuery] List.TopicParams @params)
    {
        return HandlePageResult(await Mediator.Send(new List.Query { Params = @params }));
    }

    [HttpPost("approval")]
    [Authorize]
    public async Task<IActionResult> Approval(Approval.Command command)
    {
        return HandleResult(await Mediator.Send(command));
    }

    [HttpPost("{id}")]
    [Authorize(Policy = "IsDepartmentSubjects")]
    public async Task<IActionResult> Assign(CreateDto graduationProject, string id)
    {
        return HandleResult(await Mediator.Send(new Create.Command { GraduationProject = graduationProject, Id = id }));
    }
}