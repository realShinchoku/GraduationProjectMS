using Application.Interfaces;
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
}