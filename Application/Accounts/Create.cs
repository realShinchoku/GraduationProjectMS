using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using Application.Accounts.ClassMap;
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

public partial class Create
{
    public class Command : IRequest<Result<Unit>>
    {
        public Role Role { get; set; }
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
            RuleFor(x => x.Role).NotEmpty().IsInEnum().Must(x => x.Equals(Role.Student) || x.Equals(Role.Lecturer));
            RuleFor(x => x.HasHeader).NotNull();
            RuleFor(x => x.PeriodId).NotEmpty();
        }
    }

    public partial class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;
        private readonly IEmailSender _emailSender;

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
                dynamic users;
                if (request.Role == Role.Student)
                {
                    csv.Context.RegisterClassMap<StudentMap>();
                    users = csv.GetRecords<Student>().ToList();
                }
                else
                {
                    csv.Context.RegisterClassMap<LecturerMap>();
                    users = csv.GetRecords<Lecturer>().ToList();
                }

                foreach (var user in users)
                {
                    user.Faculty = faculty;
                    user.Role = request.Role;
                    user.UserName = user.Email!.Split("@")[0];
                    if(request.Role == Role.Student) user.GraduationProjectPeriod = period;
                    if (user.Birthday != null) user.Birthday = user.Birthday.Value.ToUniversalTime();

                    var password = GeneratePassword();
                    var result = await _userManager.CreateAsync(user, password);

                    if (!result.Succeeded) continue;

                    await _userManager.AddToRoleAsync(user, user.Role.ToString());
                    await _emailSender.SendEmailAsync(user.Email, "Tài khoản của bạn", password);
                }
            }

            return Result<Unit>.Success(Unit.Value);
        }

        private static string GeneratePassword()
        {
            const string chars = "0123456789ABCDEFGHIJKLMNOPQSTUVWXYZabcdefghijklmnpqrstuvwxyz";

            while (true)
            {
                var randomNumber = new Random();
                var len = randomNumber.Next(6, 20);
                var bld = new StringBuilder();
                for (int i = 0; i < len; ++i)
                {
                    bld.Append(chars[i]);
                }

                var randomStr = bld.ToString();
                if (!PasswordRegex().IsMatch(randomStr)) continue;
                return randomStr;
            }
        }

        [GeneratedRegex("^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}")]
        private static partial Regex PasswordRegex();
    }
}