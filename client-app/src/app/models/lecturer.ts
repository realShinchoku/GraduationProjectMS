export interface Lecturer {
    id: string;
    displayName: string;
    email: string;
    birthday?: Date;
    bio: string;
    sex?: boolean;
    status: number;
    phoneNumber: string;
    studentCount: number;
    maxStudentsNumber: number;
    education: string;
    departmentSubjects: string;
    faculty: string;
}