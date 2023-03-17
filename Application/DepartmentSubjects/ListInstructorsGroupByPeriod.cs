using Application.Core;
using Application.DepartmentSubjects.DTOs;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.DepartmentSubjects;

public class ListInstructorsGroupByPeriod
{
    public class Query : IRequest<Result<PageList<InstructorsGroupByPeriodDto>>>
    {
        public PagingParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PageList<InstructorsGroupByPeriodDto>>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<PageList<InstructorsGroupByPeriodDto>>> Handle(Query request,
            CancellationToken cancellationToken)
        {
            var ds = await _userAccessor.DepartmentSubject();
            throw new NotImplementedException();
        }
    }
}