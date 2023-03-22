using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Instructors;

public class Assign
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
            var departmentSubject = await _context.DepartmentSubjects.FirstOrDefaultAsync(
                x => x.UserName == _userAccessor.GetUserName(),
                cancellationToken);
            if (departmentSubject == null)
                return null;

            var student =
                await _context.Students.Include(p => p.GraduationProjectPeriod)
                    .FirstOrDefaultAsync(x => x.Id == request.StudentId, cancellationToken);
            if (student == null)
                return null;

            if (student.Lecturer != null)
                return Result<Unit>.Failure("Sinh viên đã có giảng viên hướng dẫn");

            var lecturer =
                await _context.Lecturers.Include(s => s.Students)
                    .FirstOrDefaultAsync(x => x.Id == request.LecturerId, cancellationToken);

            if (lecturer == null) return null;


            var instructor = await _context.Instructors
                .Include(s => s.Student)
                .Include(l => l.Lecturer)
                .Include(ds => ds.DepartmentSubject)
                .FirstOrDefaultAsync(
                    x => x.Student.Id == student.Id && x.Lecturer.Id == lecturer.Id &&
                         x.DepartmentSubject.Id == departmentSubject.Id && !x.IsApproval, cancellationToken);

            if (instructor == null)
            {
                instructor = new Instructor
                {
                    DepartmentSubject = departmentSubject,
                    Lecturer = lecturer,
                    Student = student,
                    GraduationProjectPeriod = student.GraduationProjectPeriod,
                    IsApproval = true
                };
                _context.Instructors.Add(instructor);
            }
            else
            {
                instructor.IsApproval = true;
            }

            student.Lecturer = lecturer;

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Có lỗi khi chọn giảng viên hướng dẫn");

            var popupNotification = new PopupNotification
            {
                Message = $"Bạn đã được phân giảng viên {instructor.Lecturer.DisplayName} làm giảng viên hướng dẫn",
                TargetUser = student
            };

            _context.PopupNotifications.Add(popupNotification);

            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}