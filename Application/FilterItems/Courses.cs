using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.FilterItems;

public class Courses
{
    public class Query : IRequest<Result<List<int>>>
    {
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
            var courses = await _context.GraduationProjectPeriods
                .Where(x => x.Faculty == faculty)
                .Select(x => x.Course)
                .ToListAsync(cancellationToken);
            return Result<List<int>>.Success(courses);
        }
    }
}