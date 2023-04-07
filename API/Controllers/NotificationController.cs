using Application.Notifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class NotificationController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> List()
    {
        return HandleResult(await Mediator.Send(new List.Query()));
    }
    [HttpPost("{id}")]
    public async Task<IActionResult> MarkAsRead(Guid id)
    {
        return HandleResult(await Mediator.Send(new MarkAsRead.Command{Id = id}));
    }
}