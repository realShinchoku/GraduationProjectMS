export interface User {
    id: string;
    userName: string;
    displayName: string;
    token: string;
    role: Role;
    email: string;
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
    FacultyOffice = 0 as number,
    DepartmentSubject = 1 as number,
    Lecturer = 2 as number,
    Student = 3 as number
}
