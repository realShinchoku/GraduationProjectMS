using Application.Core;
using Application.GraduationProjectPeriods.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.GraduationProjectPeriods;

public class List
{
    public class Query : IRequest<Result<PageList<GraduationProjectPeriodDto>>>
    {
        public PagingParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PageList<GraduationProjectPeriodDto>>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
        {
            _context = context;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task<Result<PageList<GraduationProjectPeriodDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var faculty = await _userAccessor.GetFacultyAsync();
            if (faculty == null)
                return null;
            var query = _context.GraduationProjectPeriods
                .Include(s => s.Students)
                .Include(s => s.Syllabi)
                .Include(c => c.Classes)
                .Include(f => f.Faculty)
                .Where(x => x.Faculty == faculty)
                .ProjectTo<GraduationProjectPeriodDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            return Result<PageList<GraduationProjectPeriodDto>>.Success(
                await PageList<GraduationProjectPeriodDto>.CreateAsync(query, request.Params, cancellationToken)
            );
        }
    }
}