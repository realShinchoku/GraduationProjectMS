using Application.Core;
using Application.Interfaces;
using Application.Topics.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Persistence;

namespace Application.Topics;

public class List
{
    public class Query : IRequest<Result<PageList<TopicDto>>>
    {
        public TopicParams Params { get; set; }
    }
    
    public class TopicParams : PagingParams
    {
        public Guid PeriodId { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PageList<TopicDto>>>
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
        public async Task<Result<PageList<TopicDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var userRole = _userAccessor.GetUserRole();
            var query = _context.Students
                .Include(x => x.Lecturer)
                .Include(x => x.GraduationProject)
                .Include(x => x.GraduationProjectPeriod)
                .Include(x => x.Faculty)
                .OrderBy(x => x.StudentId)
                .Where(x => x.GraduationProject != null && x.GraduationProjectPeriod.Id == request.Params.PeriodId)
                .ProjectTo<TopicDto>(_mapper.ConfigurationProvider).AsQueryable();
            
            if (userRole == Role.DepartmentSubject)
                query = query.Where(x => x.LecturerApproval);

            return Result<PageList<TopicDto>>.Success(
                await PageList<TopicDto>.CreateAsync(query, request.Params, cancellationToken)
            );
        }
    }
}