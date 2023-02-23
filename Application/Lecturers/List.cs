using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Lecturers;

public class List
{
    public class Query : IRequest<Result<PageList<LecturerDto>>>
    {
        public LecturerParams Params { get; set; }
    }
    
    public class Handler: IRequestHandler<Query, Result<PageList<LecturerDto>>>
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
            var query = _context.Lecturers.Where(x => x.Role == Role.Lecturer)
                .ProjectTo<LecturerDto>(_mapper.ConfigurationProvider).AsQueryable();
            
            return Result<PageList<LecturerDto>>.Success(
                await PageList<LecturerDto>.CreateAsync(query, request.Params, cancellationToken)
            );
        }
    }
}