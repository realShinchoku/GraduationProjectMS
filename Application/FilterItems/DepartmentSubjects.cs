using Application.Core;
using Application.FilterItems.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.FilterItems;

public class DepartmentSubjects
{
    public class Query : IRequest<Result<List<DepartmentSubjectDto>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<DepartmentSubjectDto>>>
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

        public async Task<Result<List<DepartmentSubjectDto>>> Handle(Query request,
            CancellationToken cancellationToken)
        {
            var faculty = await _userAccessor.GetFacultyAsync();
            if (faculty == null)
                return null;
            var departmentSubjects = await _context.DepartmentSubjects.Where(x => x.Faculty == faculty)
                .ProjectTo<DepartmentSubjectDto>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
            if (departmentSubjects.Count == 0)
                return null;
            return Result<List<DepartmentSubjectDto>>.Success(departmentSubjects);
        }
    }
}