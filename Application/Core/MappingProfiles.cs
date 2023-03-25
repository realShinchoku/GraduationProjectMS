using Application.FilterItems.DTOs;
using Application.GraduationProjectPeriods.DTOs;
using Application.Instructors.DTOs;
using Application.Lecturers.DTOs;
using Application.PopupNotifications.DTOs;
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
            .ForMember(d => d.Syllabus, o => o.MapFrom(x => x.Syllabus.Name))
            .ForMember(d => d.Class, o => o.MapFrom(x => x.Class));
        CreateMap<DepartmentSubject, DepartmentSubjectDto>();
        CreateMap<Instructor, InstructorDto>()
            .ForMember(d => d.Class, o => o.MapFrom(x => x.Student.Class))
            .ForMember(d => d.Student, o => o.MapFrom(x => x.Student.DisplayName))
            .ForMember(d => d.StudentId, o => o.MapFrom(x => x.Student.StudentId))
            .ForMember(d => d.Faculty, o => o.MapFrom(x => x.Student.Faculty.DisplayName))
            .ForMember(d => d.Lecturer, o => o.MapFrom(x => x.Lecturer.DisplayName));
        CreateMap<GraduationProjectPeriod, GraduationProjectPeriodDto>()
            .ForMember(d => d.StudentsCount, o => o.MapFrom(x => x.Students.Count))
            .ForMember(d => d.SyllabiCount, o => o.MapFrom(x => x.Syllabi.Count))
            .ForMember(d => d.ClassesCount, o => o.MapFrom(x => x.Students.GroupBy(s => s.Class).Count()))
            .ForMember(d => d.ProjectsCount, o => o.MapFrom(x => x.Projects.Count))
            .ForMember(d => d.LecturersCount, o => o.MapFrom(x => x.Faculty.Lecturers.Count))
            .ForMember(d => d.Faculty, o => o.MapFrom(x => x.Faculty.DisplayName));
        CreateMap<PopupNotification, PopupNotificationDto>();
    }
}