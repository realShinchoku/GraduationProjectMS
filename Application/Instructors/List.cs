using Application.Core;
using Application.Instructors.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Instructors;

public class List
{
    public class Query : IRequest<Result<PageList<InstructorDto>>>
    {
        public InstructorParams Params { get; set; }
    }

    public class InstructorParams : PagingParams
    {
        public Guid? PeriodId { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PageList<InstructorDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
        {
            _context = context;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task<Result<PageList<InstructorDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var ds = await _userAccessor.GetDepartmentSubjectAsync();
            if (ds == null)
                return null;
            var query = _context.Instructors.OrderBy(x => x.Student.StudentId)
                .Where(x => x.DepartmentSubject == ds && !x.IsApproval).AsQueryable();

            if (request.Params.PeriodId != null)
                query = query.Where(x => x.GraduationProjectPeriod.Id == request.Params.PeriodId);

            return Result<PageList<InstructorDto>>.Success(
                await PageList<InstructorDto>.CreateAsync(query.ProjectTo<InstructorDto>(_mapper.ConfigurationProvider),
                    request.Params, cancellationToken)
            );
        }
    }
}