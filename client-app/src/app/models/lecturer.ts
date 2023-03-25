export interface Lecturer {
    id: string;
    displayName: string;
    email: string;
    birthday?: Date;
    bio: string;
    sex?: boolean;
    instructorStatus: number;
    lecturerStatus: string;
    phoneNumber: string;
    studentCount: number;
    maxStudentsNumber: number;
    education: string;
    departmentSubjects: string;
    faculty: string;
    createdDate: Date;
}