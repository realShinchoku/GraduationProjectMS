export interface User {
    userName: string;
    displayName: string;
    token: string;
    role: Role;
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface PasswordFormValues {
    oldPassword: string;
    newPassword: string;
}

export enum Role {
    FacultyOffice = <number>0,
    DepartmentSubjects = <number>1,
    Lecturer = <number>2,
    Student = <number>3
}
