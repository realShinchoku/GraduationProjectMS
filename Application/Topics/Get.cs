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
        public string Id { get; set; }
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
            var query = _context.Students
                .Include(x => x.GraduationProject).AsQueryable();
            if (request.Id != "")
                query = query.Where(x => x.Id == request.Id);
            else
                query = query.Where(x => x.UserName == _userAccessor.GetUserName());
            var student = await query.FirstOrDefaultAsync(cancellationToken);
            if (student?.GraduationProject == null)
                return null;
            return Result<GraduationProject>.Success(student.GraduationProject);
        }
    }
}