using System.Text;
using System.Text.RegularExpressions;
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

public class CreateLecture
{
    public class Command : IRequest<Result<Unit>>
    {
        public CreateLectureDto CreateLectureDto { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.CreateLectureDto).SetValidator(new CustomValidator());
        }
    }

    public class CustomValidator : AbstractValidator<CreateLectureDto>
    {
        public CustomValidator()
        {
            RuleFor(x => x.Email).EmailAddress().NotEmpty();
            RuleFor(x => x.DisplayName).NotEmpty();
            RuleFor(x => x.Education).NotEmpty();
            RuleFor(x => x.PhoneNumber).NotEmpty();
            RuleFor(x => x.DepartmentSubjectId).NotEmpty();
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private static readonly Regex PasswordRegex = new("^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}");
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
                        x => x.Id == request.CreateLectureDto.DepartmentSubjectId, cancellationToken);
                if (departmentSubject == null)
                    return null;


                var lecturer = await _userManager.FindByEmailAsync(request.CreateLectureDto.Email);
                if (lecturer != null)
                    return Result<Unit>.Failure("Email đã tồn tại");

                var password = GeneratePassword();
                var user = new Lecturer
                {
                    UserName = request.CreateLectureDto.Email.Split('@')[0],
                    Email = request.CreateLectureDto.Email,
                    PhoneNumber = request.CreateLectureDto.PhoneNumber,
                    DisplayName = request.CreateLectureDto.DisplayName,
                    DepartmentSubject = departmentSubject,
                    Faculty = faculty,
                    Education = request.CreateLectureDto.Education
                };

                var result = await _userManager.CreateAsync(user, password);

                if (!result.Succeeded)
                    return Result<Unit>.Failure("Có lỗi khi tạo tài khoản");

                await _userManager.AddToRoleAsync(user, user.Role.ToString());
                await _emailSender.SendEmailAsync(user.Email, "Tài khoản của bạn", password);

                return Result<Unit>.Success(Unit.Value);
            }

            private static string GeneratePassword()
            {
                const string chars = "0123456789ABCDEFGHIJKLMNOPQSTUVWXYZabcdefghijklmnpqrstuvwxyz";

                while (true)
                {
                    var random = new Random();
                    var len = random.Next(6, 20);
                    var bld = new StringBuilder();
                    for (var i = 0; i < len; ++i) bld.Append(chars[random.Next(chars.Length)]);

                    var randomStr = bld.ToString();
                    if (!PasswordRegex.IsMatch(randomStr)) continue;
                    return randomStr;
                }
            }
        }
    }
}