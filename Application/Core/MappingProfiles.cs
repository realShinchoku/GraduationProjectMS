using Application.Lecturers.DTOs;
using Application.Students.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<GraduationProjectPeriod, GraduationProjectPeriod>();
        CreateMap<Lecturer, LecturerDto>()
            .ForMember(d => d.DepartmentSubjects, o => o.MapFrom(x => x.DepartmentSubject.DisplayName))
            .ForMember(d => d.Faculty, o => o.MapFrom(x => x.Faculty.DisplayName))
            .ForMember(d => d.StudentCount, o => o.MapFrom(x => x.Students.Count));
        CreateMap<Student, StudentDto>()
            .ForMember(d => d.DepartmentSubjects, o => o.MapFrom(x => x.DepartmentSubject.DisplayName))
            .ForMember(d => d.Faculty, o => o.MapFrom(x => x.Faculty.DisplayName))
            .ForMember(d => d.Lecturer, o => o.MapFrom(x => x.Lecturer.DisplayName))
            .ForMember(d => d.GraduationProjectPeriod, o => o.MapFrom(x => x.GraduationProjectPeriod.Name))
            .ForMember(d => d.GraduationProjectReport, o => o.MapFrom(x => x.GraduationProjectReport.Name))
            .ForMember(d => d.GraduationProject, o => o.MapFrom(x => x.GraduationProject.Name))
            .ForMember(d => d.Syllabus, o => o.MapFrom(x => x.Syllabus.Name));
    }
}