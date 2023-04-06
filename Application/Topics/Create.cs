using Application.Core;
using Application.Interfaces;
using Application.Topics.DTOs;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Topics;

public class Create
{
    public class Command : IRequest<Result<GraduationProject>>
    {
        public CreateDto GraduationProject { get; set; }
        public string Id { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.GraduationProject).SetValidator(new CustomValidator());
        }
    }

    public class CustomValidator : AbstractValidator<CreateDto>
    {
        public CustomValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Type).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }
    }


    public class Handler : IRequestHandler<Command, Result<GraduationProject>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(IUserAccessor userAccessor, DataContext context, IMapper mapper)
        {
            _userAccessor = userAccessor;
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<GraduationProject>> Handle(Command request, CancellationToken cancellationToken)
        {
            Student student;
            if (!string.IsNullOrEmpty(request.Id))
                student = await _context.Students
                    .Include(x => x.GraduationProject)
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            else
                student = await _context.Students
                    .Include(x => x.GraduationProject)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName(), cancellationToken);

            if (student == null)
                return null;
            if (student.GraduationProject != null)
                return Result<GraduationProject>.Failure("Đã có đồ án");
            var topic = _mapper.Map<GraduationProject>(request.GraduationProject);
            if (!string.IsNullOrEmpty(request.Id))
            {
                topic.DepartmentSubjectApproval = true;
                topic.LecturerApproval = true;
            }
            student.GraduationProject = topic;
            _context.Update(student);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;
            if (!result)
                return Result<GraduationProject>.Failure("Có lỗi khi tạo đồ án");
            return Result<GraduationProject>.Success(topic);
        }
    }
}