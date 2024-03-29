using Application.Core;
using Application.Interfaces;
using Application.Lecturers.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
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
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<PageList<LecturerDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var faculty = await _userAccessor.GetFacultyAsync();
            if (faculty == null)
                return null;

            var query = _context.Lecturers
                .OrderBy(x => x.UserName.Length)
                .ThenBy(x => x.UserName)
                .Where(x => x.Faculty == faculty)
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.Params.Keyword))
                query = query.Where(x =>
                    x.DisplayName.ToLower().Contains(request.Params.Keyword.ToLower()) ||
                    x.UserName.ToLower().Contains(request.Params.Keyword.ToLower()));

            if (request.Params.Status != null)
                query = query.Where(x => x.InstructorStatus == request.Params.Status);

            if (request.Params.DepartmentSubjectId != null)
                query = query.Where(x => x.DepartmentSubject.Id == request.Params.DepartmentSubjectId);

            if (request.Params.IsDepartmentSubject)
            {
                if (_userAccessor.GetUserRole() != Role.DepartmentSubject)
                    return Result<PageList<LecturerDto>>.Failure("Not a Department Subject");

                query = query.Where(x => x.DepartmentSubject.UserName == _userAccessor.GetUserName());
            }


            return Result<PageList<LecturerDto>>.Success(
                await PageList<LecturerDto>.CreateAsync(query.ProjectTo<LecturerDto>(_mapper.ConfigurationProvider),
                    request.Params, cancellationToken)
            );
        }
    }
}