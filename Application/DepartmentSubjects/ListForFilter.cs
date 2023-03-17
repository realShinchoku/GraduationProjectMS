using Application.Core;
using Application.DepartmentSubjects.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DepartmentSubjects;

public class ListForFilter
{
    public class Query : IRequest<Result<List<DepartmentSubjectFilterDto>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<DepartmentSubjectFilterDto>>>
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

        public async Task<Result<List<DepartmentSubjectFilterDto>>> Handle(Query request,
            CancellationToken cancellationToken)
        {
            var faculty = await _userAccessor.Faculty();
            var departmentSubjects = await _context.DepartmentSubjects.Where(x => x.Faculty == faculty)
                .ProjectTo<DepartmentSubjectFilterDto>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
            if (departmentSubjects.Count == 0)
                return null;
            return Result<List<DepartmentSubjectFilterDto>>.Success(departmentSubjects);
        }
    }
}