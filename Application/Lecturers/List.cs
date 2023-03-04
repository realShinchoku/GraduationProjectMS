using System.Diagnostics;
using Application.Core;
using Application.Interfaces;
using Application.Lecturers.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
            var faculty = _userAccessor.Faculty();
            if (faculty == null)
                return null;
            
            var query = _context.Lecturers
                .OrderBy(x => x.UserName.Length)
                .ThenBy(x => x.UserName)
                .Where(x => x.Faculty == faculty)
                .AsQueryable();

            if (request.Params.Status != null)
                query = query.Where(x => x.InstructorStatus == request.Params.Status);
            
            if (request.Params.DepartmentSubjectId != null)
                query = query.Where(x => x.DepartmentSubject.Id == request.Params.DepartmentSubjectId);

            
            var result = query.ProjectTo<LecturerDto>(_mapper.ConfigurationProvider).AsQueryable();

            return Result<PageList<LecturerDto>>.Success(
                await PageList<LecturerDto>.CreateAsync(result, request.Params, cancellationToken)
            );
        }
    }
}