using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.FilterItems;

public class Phases
{
    public class Query : IRequest<Result<List<int>>>
    {
        public int? Course { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<int>>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<List<int>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var faculty = await _userAccessor.GetFacultyAsync();
            if (faculty == null)
                return null;
            var query = _context.GraduationProjectPeriods
                .Where(x => x.Faculty == faculty)
                .AsQueryable();

            if (request.Course != null)
                query = query.Where(x => x.Course == request.Course);

            var courses = await query.Select(x => x.Phase).ToListAsync(cancellationToken);

            return Result<List<int>>.Success(courses);
        }
    }
}