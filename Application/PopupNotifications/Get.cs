using Application.Core;
using Application.PopupNotifications.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PopupNotifications;

public class Get
{
    public class Query : IRequest<Result<PopupNotificationDto>>
    {
        public string Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PopupNotificationDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<PopupNotificationDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var notification =
                await _context.PopupNotifications
                    .OrderBy(x => x.CreatedDate)
                    .FirstOrDefaultAsync(x => x.TargetUser.Id == request.Id && !x.IsRead, cancellationToken);
            if (notification == null)
                return null;
            return Result<PopupNotificationDto>.Success(_mapper.Map<PopupNotificationDto>(notification));
        }
    }
}