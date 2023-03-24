using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.GraduationProjectPeriods;

public class Edit
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
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Course).NotEmpty();
            RuleFor(x => x.Phase).NotEmpty();
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
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var period =
                await _context.GraduationProjectPeriods.FirstOrDefaultAsync(
                    x => x.Id == request.GraduationProjectPeriod.Id, cancellationToken);

            if (period == null)
                return null;

            _mapper.Map(request.GraduationProjectPeriod, period);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Failed to create Graduation Project period");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}