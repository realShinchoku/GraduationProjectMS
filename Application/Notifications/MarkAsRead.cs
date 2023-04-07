using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Notifications;

public class MarkAsRead
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var notification =
                await _context.Notifications.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (notification == null)
                return null;
            notification.IsRead = true;
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;
            if (!result)
                return Result<Unit>.Failure("Có lỗi xảy ra");
            return Result<Unit>.Success(Unit.Value);
        }
    }
}