using Application.Core;
using Application.DepartmentSubjects.DTOs;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DepartmentSubjects;

public class ConfirmLecturer
{
    public class Command : IRequest<Result<Unit>>
    {
        public IdsDto Ids { get; set; }
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
            var departmentSubject = await _context.DepartmentSubjects.FirstOrDefaultAsync(
                x => x.UserName == _userAccessor.GetUserName(),
                cancellationToken);
            if (departmentSubject == null)
                return null;

            var student =
                await _context.Students.FirstOrDefaultAsync(x => x.Id == request.Ids.StudentId, cancellationToken);
            if (student == null)
                return null;

            var lecturer =
                await _context.Lecturers.Include(s => s.Students)
                    .FirstOrDefaultAsync(x => x.Id == request.Ids.LecturerId, cancellationToken);
            if (lecturer == null)
                return null;

            var instructor = await _context.Instructors.FirstOrDefaultAsync(
                x => x.StudentId == student.Id && x.LecturerId == lecturer.Id &&
                     x.DepartmentSubjectId == departmentSubject.Id &&
                     !x.IsConfirm,
                cancellationToken);

            if (instructor == null)
                return null;

            if (lecturer.Students.Count >= lecturer.MaxStudentsNumber)
                return Result<Unit>.Failure("Giảng viên không thể nhận thêm sinh viên");

            student.Lecturer = lecturer;

            instructor.IsConfirm = true;

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Có lỗi khi chấp nhận giảng viên hướng dẫn");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}