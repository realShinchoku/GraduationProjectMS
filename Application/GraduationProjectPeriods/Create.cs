using Application.Core;
using Application.GraduationProjectPeriods.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.GraduationProjectPeriods;

public class Create
{
    public class Command : IRequest<Result<Unit>>
    {
        public CreateDto GraduationProjectPeriod { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.GraduationProjectPeriod).SetValidator(new CustomCreateValidator());
        }
    }

    public class CustomCreateValidator : AbstractValidator<CreateDto>
    {
        public CustomCreateValidator()
        {
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
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
        {
            _context = context;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var faculty = await _userAccessor.GetFacultyAsync();
            if (faculty == null)
                return null;

            var period = await _context.GraduationProjectPeriods.FirstOrDefaultAsync(
                x => x.Course == request.GraduationProjectPeriod.Course &&
                     x.Phase == request.GraduationProjectPeriod.Phase && x.Faculty == faculty, cancellationToken);

            if (period != null)
                return Result<Unit>.Failure($"Đã tồn tại {period.Name}");
            
            period = _mapper.Map<GraduationProjectPeriod>(request.GraduationProjectPeriod);
            period.Faculty = faculty;
            period.Name = $"Đồ án Khóa K{request.GraduationProjectPeriod.Course} Đợt {request.GraduationProjectPeriod.Phase}";
            _context.GraduationProjectPeriods.Add(period);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Failed to create Graduation Project period");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}