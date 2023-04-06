using Application.Core;
using Application.GraduationProjectPeriods.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.GraduationProjectPeriods;

public class List
{
    public class Query : IRequest<Result<PageList<GraduationProjectPeriodDto>>>
    {
        public PeriodParams Params { get; set; }
    }

    public class PeriodParams : PagingParams
    {
        public int? Course { get; set; }
        public int? Phase { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PageList<GraduationProjectPeriodDto>>>
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

        public async Task<Result<PageList<GraduationProjectPeriodDto>>> Handle(Query request,
            CancellationToken cancellationToken)
        {
            var faculty = await _userAccessor.GetFacultyAsync();
            if (faculty == null)
                return null;
            var query = _context.GraduationProjectPeriods
                .Include(s => s.Students)
                .Include(x => x.Projects)
                .Include(s => s.Syllabi)
                .Include(f => f.Faculty.Lecturers)
                .Where(x => x.Faculty == faculty)
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.Params.Keyword))
                query = query.Where(x => x.Name.ToLower().Contains(request.Params.Keyword.ToLower()));
            if (request.Params.Course != null)
                query = query.Where(x => x.Course == request.Params.Course);
            if (request.Params.Phase != null)
                query = query.Where(x => x.Phase == request.Params.Phase);

            return Result<PageList<GraduationProjectPeriodDto>>.Success(
                await PageList<GraduationProjectPeriodDto>.CreateAsync(
                    query.ProjectTo<GraduationProjectPeriodDto>(_mapper.ConfigurationProvider), request.Params,
                    cancellationToken)
            );
        }
    }
}