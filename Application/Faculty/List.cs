using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Faculty;

public class List
{
    public class Query : IRequest<Result<PageList<FacultyDto>>>
    {
        public FacultyParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PageList<FacultyDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<PageList<FacultyDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = _context.Faculties
                .OrderBy(x => x.UserName.Length)
                .ThenBy(x => x.UserName)
                .Include(ds => ds.DepartmentSubjects)
                .Include(l => l.Lecturers)
                .Include(s => s.Students)
                .ProjectTo<FacultyDto>(_mapper.ConfigurationProvider).AsQueryable();

            return Result<PageList<FacultyDto>>.Success(
                await PageList<FacultyDto>.CreateAsync(query, request.Params, cancellationToken)
            );
        }
    }
}