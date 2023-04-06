using System.Globalization;
using Application.Accounts.DTOs;
using Application.Core;
using Application.Interfaces;
using CsvHelper;
using CsvHelper.Configuration;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Accounts;

public class CreateStudent
{
    public class Command : IRequest<Result<Unit>>
    {
        public IFormFile File { get; set; }
        public bool HasHeader { get; set; }
        public string PeriodId { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.File).NotEmpty();
            RuleFor(x => x.File.ContentType).NotEmpty().Must(x => x.Equals("text/csv"));
            RuleFor(x => x.HasHeader).NotNull();
            RuleFor(x => x.PeriodId).NotEmpty();
        }
    }


    protected sealed class StudentMap : ClassMap<Student>
    {
        public StudentMap()
        {
            Map(p => p.StudentId).Index(0);
            Map(p => p.Email).Index(1);
            Map(p => p.DisplayName).Index(2);
            Map(p => p.Class).Index(3);
            Map(p => p.Birthday).Index(4);
            Map(p => p.Sex).Index(5);
        }
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
            var faculty = await _context.Faculties.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName(),
                cancellationToken);
            if (faculty == null)
                return null;

            var period =
                await _context.GraduationProjectPeriods.FirstOrDefaultAsync(x => x.Id.ToString() == request.PeriodId,
                    cancellationToken);

            if (period == null)
                return null;

            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = request.HasHeader
            };

            using (var reader = new StreamReader(request.File.OpenReadStream()))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Context.RegisterClassMap<StudentMap>();
                var users = csv.GetRecords<Student>().ToList();

                foreach (var user in users)
                {
                    user.Faculty = faculty;
                    user.Role = Role.Student;
                    user.UserName = user.Email!.Split("@")[0];
                    user.GraduationProjectPeriod = period;
                    if (user.Birthday != null) user.Birthday = user.Birthday.Value.ToUniversalTime();

                    var password = PasswordGenerator.GeneratePassword();
                    var result = await _userManager.CreateAsync(user, password);

                    if (!result.Succeeded)
                    {
                        var student =
                            await _context.Students.FirstOrDefaultAsync(x => x.Email == user.Email, cancellationToken);
                        if (student != null)
                        {
                            student.Faculty = faculty;
                            student.GraduationProjectPeriod = period;
                            var res = await _context.SaveChangesAsync(cancellationToken) > 0;
                            if (res)
                                await _emailSender.SendEmailAsync(user.Email, "Tài khoản của bạn", password);
                        }

                        continue;
                    }

                    await _userManager.AddToRoleAsync(user, user.Role.ToString());
                    await _emailSender.SendEmailAsync(user.Email, "Tài khoản của bạn", password);
                }
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}