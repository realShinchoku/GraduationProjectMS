using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Topics;

public class Edit
{
    public class Command : IRequest<Result<GraduationProject>>
    {
        public GraduationProject GraduationProject { get; set; }
    }
    
    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.GraduationProject).SetValidator(new CustomValidator());
        }
    }

    public class CustomValidator : AbstractValidator<GraduationProject>
    {
        public CustomValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Type).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }
    }


    public class Handler : IRequestHandler<Command, Result<GraduationProject>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;

        public Handler(IUserAccessor userAccessor, DataContext context)
        {
            _userAccessor = userAccessor;
            _context = context;
        }
        public async Task<Result<GraduationProject>> Handle(Command request, CancellationToken cancellationToken)
        {
            var student = await _context.Students
                .Include(x => x.GraduationProject)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName(), cancellationToken);
            if (student?.GraduationProject == null)
                return null;
            if(student.GraduationProject.Id != request.GraduationProject.Id)
                return null;

            student.GraduationProject.Name = request.GraduationProject.Name;
            student.GraduationProject.Type = request.GraduationProject.Type;
            student.GraduationProject.Description = request.GraduationProject.Description;
            
            _context.Update(student);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;
            if (!result)
                return Result<GraduationProject>.Failure("Có lỗi khi sửa đồ án");
            return Result<GraduationProject>.Success(student.GraduationProject);
        }
    }
}