using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Students;

public class ConfirmLecturer
{
    public class Command : IRequest<Result<Unit>>
    {
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
            var student =
                await _context.Students.FirstOrDefaultAsync(x => x.Id == _userAccessor.GetUserName(),
                    cancellationToken);
            if (student == null)
                return null;

            var instructor =
                await _context.Instructors.Include(s => s.Student).FirstOrDefaultAsync(x => x.Student.Id == student.Id, cancellationToken);

            if (instructor == null)
                return null;

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Có lỗi xảy ra");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}