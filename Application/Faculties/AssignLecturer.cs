using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Faculties;

public class AssignLecturer
{
    public class Command : IRequest<Result<Unit>>
    {
        public string StudentId { get; set; }
        public string LecturerId { get; set; }
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
            var faculty = await _context.Faculties.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName(),
                cancellationToken);
            if (faculty == null)
                return null;

            var student =
                await _context.Students.FirstOrDefaultAsync(x => x.Id == request.StudentId, cancellationToken);
            if (student == null)
                return null;

            if (student.Lecturer != null)
                return Result<Unit>.Failure("Sinh viên đã có giảng viên hướng dẫn");

            var lecturer =
                await _context.Lecturers.Include(s => s.Students)
                    .FirstOrDefaultAsync(x => x.Id == request.LecturerId, cancellationToken);

            if (lecturer == null) return null;

            if (lecturer.Students.Count >= lecturer.MaxStudentsNumber)
                return Result<Unit>.Failure("Giảng viên không thể nhận thêm sinh viên");

            student.Lecturer = lecturer;

            var instructor = new Instructor
            {
                Faculty = faculty,
                Lecturer = lecturer,
                Student = student,
                StudentId = student.Id,
                LecturerId = lecturer.Id,
                FacultyId = faculty.Id,
                IsConfirm = true
            };

            _context.Instructors.Add(instructor);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Có lỗi khi chọn giảng viên");
            return Result<Unit>.Success(Unit.Value);
        }
    }
}