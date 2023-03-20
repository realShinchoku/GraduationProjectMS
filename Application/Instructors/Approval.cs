using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Instructors;

public class Approval
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid InstructorId { get; set; }
        public bool Status { get; set; }
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
            var departmentSubject = await _userAccessor.GetDepartmentSubjectAsync();
            if (departmentSubject == null)
                return null;

            var instructor = await _context.Instructors
                .Include(s => s.Student)
                .Include(l => l.Lecturer.Students)
                .Include(ds => ds.DepartmentSubject)
                .FirstOrDefaultAsync(x => x.Id == request.InstructorId, cancellationToken);

            if (instructor == null)
                return null;

            if (instructor.Lecturer.Students.Count >= instructor.Lecturer.MaxStudentsNumber)
                return Result<Unit>.Failure("Giảng viên không thể nhận thêm sinh viên");

            instructor.Student.Lecturer = instructor.Lecturer;

            instructor.ApprovalStatus = request.Status;

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Có lỗi khi chấp nhận giảng viên hướng dẫn");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}