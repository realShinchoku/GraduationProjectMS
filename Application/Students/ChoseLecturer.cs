using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Students;

public class ChoseLecturer
{
    public class Command : IRequest<Result<Unit>>
    {
        public string Id { get; set; }
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
            var student = await _context.Students.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName(),
                cancellationToken);

            if (student == null) return null;

            var instructor =
                await _context.Instructors.FirstOrDefaultAsync(x => x.StudentId == student.Id, cancellationToken);

            if (instructor != null || student.Lecturer != null)
                return Result<Unit>.Failure("Bạn đã có giảng viên hướng dẫn");

            var lecturer =
                await _context.Lecturers
                    .Include(s => s.Students)
                    .Include(f => f.Faculty)
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (lecturer == null) return null;

            if (lecturer.Students.Count >= lecturer.MaxStudentsNumber && lecturer.MaxStudentsNumber != 0)
                return Result<Unit>.Failure("Giảng viên không thể nhận thêm sinh viên");

            instructor = new Instructor
            {
                DepartmentSubject = lecturer.DepartmentSubject,
                Lecturer = lecturer,
                Student = student,
                StudentId = student.Id,
                LecturerId = lecturer.Id,
                DepartmentSubjectId = lecturer.DepartmentSubject.Id
            };

            _context.Instructors.Add(instructor);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Có lỗi khi chọn giảng viên");
            return Result<Unit>.Success(Unit.Value);
        }
    }
}