using Application.Interfaces;
using Application.PopupNotifications;
using Domain;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Persistence;

namespace API.SignalR;

public class ChatHub : Hub
{
    private readonly IMediator _mediator;
    private readonly IUserAccessor _userAccessor;

    public ChatHub(IMediator mediator, IUserAccessor userAccessor, DataContext context)
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
        await Groups.AddToGroupAsync(Context.ConnectionId, _userAccessor.GetUserRole().ToString());
        if (_userAccessor.GetUserRole() == Role.Student)
            await GetPopupNotificationAsync();
    }

    public async Task GetPopupNotificationAsync()
    {
        var result = await _mediator.Send(new Get.Query { Id = _userAccessor.GetUserId() });
        await Clients.Caller.SendAsync("GetPopup", result?.Value);
    }

    public async Task SendPopupNotificationAsync()
    {
        await Clients.Group(Role.Student.ToString()).SendAsync("ReceivePopupNotification");
    }
}