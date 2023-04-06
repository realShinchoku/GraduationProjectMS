using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Topics;

public class Approval
{
    public class Command : IRequest<Result<Unit>>
    {
        public int Status { get; set; }
        public string Note { get; set; }
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var userRole = _userAccessor.GetUserRole();
            var topic = await _context.GraduationProjects.FirstOrDefaultAsync(x => x.Id == request.Id,
                cancellationToken);
            if (topic == null)
                return null;
            if (userRole == Role.DepartmentSubject)
                topic.DepartmentSubjectApproval = request.Status != 0;
            else if (userRole == Role.Lecturer)
                topic.LecturerApproval = request.Status != 0;

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Có lỗi khi duyệt đề tài");
            return Result<Unit>.Success(Unit.Value);
        }
    }
}