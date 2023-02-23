using Application.Lecturers;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Lecturer, LecturerDto>()
            .ForMember(d => d.DepartmentSubjects, o => o.MapFrom(x => x.GetDepartmentSubjectName()))
            .ForMember(d => d.Faculty, o => o.MapFrom(x => x.GetFacultyName()))
            .ForMember(d => d.StudentCount, o => o.MapFrom(x => x.Students.Count));
    }
}