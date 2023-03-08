using Application.Test;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace API.Controllers;

public class TestController : BaseApiController
{
    [HttpPost("upload")]
    [AllowAnonymous]
    public async Task<IActionResult> Test([FromForm] TestUpload.Command command)
    {
        return HandleResult(await Mediator.Send(command));
    }
}