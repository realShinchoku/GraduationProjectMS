using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Lecturers;

public class List
{
    public class Query : IRequest<Result<PageList<LecturerDto>>>
    {
        public LecturerParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PageList<LecturerDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<PageList<LecturerDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = _context.Lecturers
                .OrderBy(x => x.UserName.Length)
                .ThenBy(x => x.UserName)
                .ProjectTo<LecturerDto>(_mapper.ConfigurationProvider).AsQueryable();

            return Result<PageList<LecturerDto>>.Success(
                await PageList<LecturerDto>.CreateAsync(query, request.Params, cancellationToken)
            );
        }
    }
}