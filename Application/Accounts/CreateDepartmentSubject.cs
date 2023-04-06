using Application.Accounts.DTOs;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Accounts;

public class CreateDepartmentSubject
{
    public class Command : IRequest<Result<Unit>>
    {
        public CreateDepartmentSubjectDto CreateDepartmentSubjectDto { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.CreateDepartmentSubjectDto).SetValidator(new CustomValidator());
        }
    }

    public class CustomValidator : AbstractValidator<CreateDepartmentSubjectDto>
    {
        public CustomValidator()
        {
            RuleFor(x => x.Email).EmailAddress().NotEmpty();
            RuleFor(x => x.DisplayName).NotEmpty();
            RuleFor(x => x.PhoneNumber).NotEmpty();
            RuleFor(x => x.Username).NotEmpty();
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IEmailSender _emailSender;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;

            public Handler(UserManager<AppUser> userManager, IUserAccessor userAccessor, DataContext context,
                IEmailSender emailSender)
            {
                _userManager = userManager;
                _userAccessor = userAccessor;
                _context = context;
                _emailSender = emailSender;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var faculty = await _context.Faculties.FirstOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetUserName(),
                    cancellationToken);
                if (faculty == null)
                    return null;

                var departmentSubject =
                    await _context.DepartmentSubjects.FirstOrDefaultAsync(
                        x => x.UserName == request.CreateDepartmentSubjectDto.Username ||
                             x.Email == request.CreateDepartmentSubjectDto.Email, cancellationToken);
                if (departmentSubject != null)
                    return Result<Unit>.Failure("Người dùng đã tồn tại");

                var password = PasswordGenerator.GeneratePassword();

                var user = new DepartmentSubject
                {
                    UserName = request.CreateDepartmentSubjectDto.Username,
                    Email = request.CreateDepartmentSubjectDto.Email,
                    PhoneNumber = request.CreateDepartmentSubjectDto.PhoneNumber,
                    DisplayName = request.CreateDepartmentSubjectDto.DisplayName,
                    Faculty = faculty
                };

                var result = await _userManager.CreateAsync(user, password);

                if (!result.Succeeded)
                    return Result<Unit>.Failure("Có lỗi khi tạo tài khoản");

                await _userManager.AddToRoleAsync(user, user.Role.ToString());
                await _emailSender.SendEmailAsync(user.Email, "Tài khoản của bạn", password);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}