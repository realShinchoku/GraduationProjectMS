using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.GraduationProjectPeriods;

public class Create
{
    public class Command : IRequest<Result<Unit>>
    {
        public GraduationProjectPeriod GraduationProjectPeriod { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.GraduationProjectPeriod).SetValidator(new CustomValidator());
        }
    }

    public class CustomValidator : AbstractValidator<GraduationProjectPeriod>
    {
        public CustomValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.ProtectionTime).NotEmpty();
            RuleFor(x => x.GraduationProjectTime).NotEmpty();
            RuleFor(x => x.RegisterTopicTime).NotEmpty();
            RuleFor(x => x.ContactInstructorTime).NotEmpty();
            RuleFor(x => x.SyllabusReviewTime).NotEmpty();
            RuleFor(x => x.SyllabusSubmissionTime).NotEmpty();
        }
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
            var faculty = await _userAccessor.GetFacultyAsync();
            if (faculty == null)
                return null;
            
            request.GraduationProjectPeriod.Faculty = faculty;
            _context.GraduationProjectPeriods.Add(request.GraduationProjectPeriod);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Failed to create Graduation Project period");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}