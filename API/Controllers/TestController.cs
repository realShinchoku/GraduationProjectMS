using Application.Test;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class TestController : BaseApiController
{
    [HttpPost("upload")]
    [AllowAnonymous]
    public async Task<IActionResult> Test([FromForm] TestUpload.Command command)
    {
        return HandleResult(await Mediator.Send(command));
    }

    [HttpDelete]
    [AllowAnonymous]
    public async Task<IActionResult> Delete(string id)
    {
        return HandleResult(await Mediator.Send(new TestDelete.Command { FileId = id }));
    }
}