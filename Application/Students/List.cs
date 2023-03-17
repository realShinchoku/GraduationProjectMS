using Application.Core;
using Application.Students.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Students;

public class List
{
    public class Query : IRequest<Result<PageList<StudentDto>>>
    {
        public StudentParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PageList<StudentDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<PageList<StudentDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = _context.Students
                .OrderBy(x => x.UserName.Length)
                .ThenBy(x => x.UserName)
                .ProjectTo<StudentDto>(_mapper.ConfigurationProvider).AsQueryable();

            return Result<PageList<StudentDto>>.Success(
                await PageList<StudentDto>.CreateAsync(query, request.Params, cancellationToken)
            );
        }
    }
}