using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Instructors;

public class Approval
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid InstructorId { get; set; }
        public int Status { get; set; }
        public string Note { get; set; }
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

            instructor.ApprovalStatus = request.Status != 0;

            if (request.Status != 0)
                instructor.Student.Lecturer = instructor.Lecturer;
            else
                instructor.Student.Lecturer = null;

            if (string.IsNullOrEmpty(request.Note))
                instructor.Note = request.Note;

            instructor.IsApproval = true;

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Có lỗi khi chấp nhận giảng viên hướng dẫn");

            var popupNotification = new PopupNotification
            {
                Message = $"Yêu cầu giảng viên {instructor.Lecturer.DisplayName} đã được chấp thuận",
                TargetUser = instructor.Student
            };

            _context.PopupNotifications.Add(popupNotification);

            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}