using Application.Core;
using Application.Faculties.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Faculties;

public class CurrentFaculty
{
    public class Query : IRequest<Result<FacultyDto>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<FacultyDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(IUserAccessor userAccessor, DataContext context, IMapper mapper)
        {
            _userAccessor = userAccessor;
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<FacultyDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var faculty = _userAccessor.GetUserRole() switch
            {
                Role.FacultyOffice => await _context.Faculties.Where(x => x.UserName == _userAccessor.GetUserName())
                    .ProjectTo<FacultyDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(cancellationToken),
                Role.DepartmentSubject => await _context.Faculties.Include(ds => ds.DepartmentSubjects)
                    .Where(x => x.DepartmentSubjects.Any(ds => ds.UserName == _userAccessor.GetUserName()))
                    .ProjectTo<FacultyDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(cancellationToken),
                Role.Lecturer => await _context.Faculties.Include(l => l.Lecturers)
                    .Where(x => x.DepartmentSubjects.Any(l => l.UserName == _userAccessor.GetUserName()))
                    .ProjectTo<FacultyDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(cancellationToken),
                Role.Student => await _context.Faculties.Include(s => s.Students)
                    .Where(x => x.DepartmentSubjects.Any(s => s.UserName == _userAccessor.GetUserName()))
                    .ProjectTo<FacultyDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(cancellationToken),
                _ => null
            };
            return faculty == null ? null : Result<FacultyDto>.Success(faculty);
        }
    }
}