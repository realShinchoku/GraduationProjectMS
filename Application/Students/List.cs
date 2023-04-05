using Application.Core;
using Application.Interfaces;
using Application.Students.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<PageList<StudentDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = _context.Students
                .Include(s => s.Lecturer)
                .Include(s => s.DepartmentSubject)
                .OrderBy(x => x.UserName.Length)
                .ThenBy(x => x.UserName).AsQueryable();

            if (request.Params.PeriodId != default)
                query = query.Where(x => x.GraduationProjectPeriod.Id == request.Params.PeriodId);
            if (request.Params.HasLecturer != null)
                query = query.Where(x => request.Params.HasLecturer == false ? x.Lecturer == null : x.Lecturer != null);
            if (_userAccessor.GetUserRole() == Role.Lecturer)
                query = query.Where(x => x.Lecturer.UserName == _userAccessor.GetUserName());
            if (request.Params.HasTopic != null)
                query = query.Where(x => request.Params.HasTopic == false ? x.GraduationProject == null : x.GraduationProject != null);
            return Result<PageList<StudentDto>>.Success(
                await PageList<StudentDto>.CreateAsync(query.ProjectTo<StudentDto>(_mapper.ConfigurationProvider),
                    request.Params, cancellationToken)
            );
        }
    }
}