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

            var student = await _context.Students
                .Include(x => x.GraduationProject)
                .Include(x => x.DepartmentSubject)
                .Include(x => x.Lecturer)
                .FirstOrDefaultAsync(x => x.GraduationProject.Id == request.Id, cancellationToken);

            var notification = new Notification
            {
                Student = student,
                Name = "Xác nhận hoàn thành đăng ký đề tài",
                InfoTitle = "Thông tin đề tài",
                Infos = new List<Info>
                {
                    new()
                    {
                        Key = "Tên đề tài",
                        Value = topic.Name
                    },
                    new()
                    {
                        Key = "Mô tả",
                        Value = topic.Description
                    },
                    new()
                    {
                        Key = "Kiểu đồ án",
                        Value = topic.Type
                    }
                }
            };

            _context.Notifications.Add(notification);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}