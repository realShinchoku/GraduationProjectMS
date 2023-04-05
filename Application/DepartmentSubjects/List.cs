using Application.Core;
using Application.DepartmentSubjects.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DepartmentSubjects;

public class List
{
    public class Query : IRequest<Result<PageList<DepartmentSubjectDto>>>
    {
        public DepartmentSubjectParams Params { get; set; }
    }

    public class DepartmentSubjectParams : PagingParams
    {
    }

    public class Handler : IRequestHandler<Query, Result<PageList<DepartmentSubjectDto>>>
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

        public async Task<Result<PageList<DepartmentSubjectDto>>> Handle(Query request,
            CancellationToken cancellationToken)
        {
            var faculty = await _userAccessor.GetFacultyAsync();
            if (faculty == null)
                return null;

            var query = _context.DepartmentSubjects
                .Include(s => s.Students)
                .Include(l => l.Lecturers)
                .Include(f => f.Faculty)
                .Where(x => x.Faculty == faculty)
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.Params.Keyword))
                query = query.Where(x =>
                    x.DisplayName.ToLower().Contains(request.Params.Keyword.ToLower()) ||
                    x.UserName.ToLower().Contains(request.Params.Keyword.ToLower()));

            return Result<PageList<DepartmentSubjectDto>>.Success(
                await PageList<DepartmentSubjectDto>.CreateAsync(
                    query.ProjectTo<DepartmentSubjectDto>(_mapper.ConfigurationProvider), request.Params,
                    cancellationToken)
            );
        }
    }
}