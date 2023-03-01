using Application.Core;
using Application.Faculties.DTOs;
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
            var faculty = await _context.Faculties.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName(),
                cancellationToken);
            if (faculty == null)
                return null;

            var student =
                await _context.Students.FirstOrDefaultAsync(x => x.Id == request.Ids.StudentId, cancellationToken);
            if (student == null)
                return null;

            if (student.Lecturer != null)
                return Result<Unit>.Failure("Sinh viên đã có giảng viên hướng dẫn");

            var lecturer =
                await _context.Lecturers.Include(s => s.Students)
                    .FirstOrDefaultAsync(x => x.Id == request.Ids.LecturerId, cancellationToken);

            if (lecturer == null) return null;


            var instructor = await _context.Instructors.FirstOrDefaultAsync(
                x => x.StudentId == request.Ids.StudentId && x.LecturerId == request.Ids.LecturerId &&
                     x.FacultyId == faculty.Id, cancellationToken);

            if (instructor == null)
            {
                instructor = new Instructor
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
            }
            else
                instructor.IsConfirm = true;
            
            student.Lecturer = lecturer;

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Có lỗi khi chọn giảng viên hướng dẫn");
            return Result<Unit>.Success(Unit.Value);
        }
    }
}