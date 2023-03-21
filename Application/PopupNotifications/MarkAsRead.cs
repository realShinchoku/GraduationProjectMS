﻿using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PopupNotifications;

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
            var popupNotification = await _context.PopupNotifications.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (popupNotification == null)
                return null;
            popupNotification.IsRead = true;
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;
            if (!result)
                return Result<Unit>.Failure("Có lỗi xảy ra");
            return Result<Unit>.Success(Unit.Value);
        }
    }
}