using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Topics;

public class Get
{
    public class Query : IRequest<Result<GraduationProject>>
    {
    }
    
    public class Handler : IRequestHandler<Query, Result<GraduationProject>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public async Task<Result<GraduationProject>> Handle(Query request, CancellationToken cancellationToken)
        {
            var student = await _context.Students
                .Include(x => x.GraduationProject)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName(), cancellationToken);
            if (student == null)
                return null;
            return Result<GraduationProject>.Success(student.GraduationProject);
        }
    }
}