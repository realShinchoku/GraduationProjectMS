using Application.Interfaces;
using Application.PopupNotifications;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class ChatHub : Hub
{
    private readonly IMediator _mediator;
    private readonly IUserAccessor _userAccessor;

    public ChatHub(IMediator mediator, IUserAccessor userAccessor)
    {
        _mediator = mediator;
        _userAccessor = userAccessor;
    }

    public async Task MaskAsRead(MarkAsRead.Command command)
    {
        var result = await _mediator.Send(command);
        await Clients.Caller.SendAsync("ReceiveMaskAsRead", result?.Value);
    }

    public override async Task OnConnectedAsync()
    {
        var result = await _mediator.Send(new Get.Query { Id = _userAccessor.GetUserId() });
        await Clients.Caller.SendAsync("GetPopup", result?.Value);
    }
}