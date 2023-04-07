using Application.Core;
using Application.GraduationProjectPeriods.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.GraduationProjectPeriods;

public class Single
{
    public class Query : IRequest<Result<GraduationProjectPeriodDto>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<GraduationProjectPeriodDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<GraduationProjectPeriodDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var period =
                await _context.GraduationProjectPeriods
                    .Include(s => s.Students)
                    .Include(x => x.Projects)
                    .Include(s => s.Syllabi)
                    .Include(f => f.Faculty.Lecturers)
                    .ProjectTo<GraduationProjectPeriodDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (period == null)
                return null;

            return Result<GraduationProjectPeriodDto>.Success(period);
        }
    }
}