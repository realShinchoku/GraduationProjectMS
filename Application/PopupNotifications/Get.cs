using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PopupNotifications;

public class Get
{
    public class Query : IRequest<Result<PopupNotification>>
    {
        public string Id { get; set; }
    }
    
    public class Handler : IRequestHandler<Query, Result<PopupNotification>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<PopupNotification>> Handle(Query request, CancellationToken cancellationToken)
        {
            var notification =
                await _context.PopupNotifications
                    .OrderBy(x => x.CreatedDate)
                    .FirstOrDefaultAsync(x => x.TargetUser.Id == request.Id, cancellationToken);
            if (notification == null)
                return null;
            return  Result<PopupNotification>.Success(notification);
        }
    }
}