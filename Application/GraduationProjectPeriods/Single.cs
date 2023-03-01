using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.GraduationProjectPeriods;

public class Single
{
    public class Query : IRequest<Result<GraduationProjectPeriod>>
    {
        public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Query, Result<GraduationProjectPeriod>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<GraduationProjectPeriod>> Handle(Query request, CancellationToken cancellationToken)
        {
            var period = await _context.GraduationProjectPeriods.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (period == null)
                return null;
            
            return Result<GraduationProjectPeriod>.Success(period);
        }
    }
}