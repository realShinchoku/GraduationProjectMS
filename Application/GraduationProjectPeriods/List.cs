using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.GraduationProjectPeriods;

public class List
{
    public class Query : IRequest<Result<PageList<GraduationProjectPeriod>>>
    {
        public PagingParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PageList<GraduationProjectPeriod>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<PageList<GraduationProjectPeriod>>> Handle(Query request,
            CancellationToken cancellationToken)
        {
            var query = _context.GraduationProjectPeriods.AsQueryable();

            return Result<PageList<GraduationProjectPeriod>>.Success(
                await PageList<GraduationProjectPeriod>.CreateAsync(query, request.Params, cancellationToken)
            );
        }
    }
}