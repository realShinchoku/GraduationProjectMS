export interface User {
    userName: string;
    displayName: string;
    token: string;
    role: Role;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}

export enum Role {  
    FacultyOffice = <number>0,
    DepartmentSubjects = <number>1,
    Lecturer = <number>2,
    Student = <number>3
}

export enum RoleName {
    "Văn phòng khoa" = <number>0,
    "Bộ môn" = <number>1,
    "Giảng viên" = <number>2,
    "Sinh viên" = <number>3
}