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
    
    [HttpGet]
    [Authorize(Policy = "IsStudent")]
    public async Task<IActionResult> Get()
    {
        return HandleResult(await Mediator.Send(new Get.Query()));
    }
}