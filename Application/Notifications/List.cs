using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Notifications;

public class List
{
    public class Query : IRequest<Result<List<Notification>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<Notification>>>
    {
        private readonly DataContext _context;

        public Handler(IUserAccessor userAccessor, DataContext context)
        {
            UserAccessor = userAccessor;
            _context = context;
        }

        public IUserAccessor UserAccessor { get; }

        public async Task<Result<List<Notification>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var notifications = await _context.Notifications
                .Include(x => x.Student)
                .Where(x => x.Student.UserName == UserAccessor.GetUserName() && !x.IsRead)
                .ToListAsync(cancellationToken);

            return Result<List<Notification>>.Success(notifications);
        }
    }
}