export interface Instructor {
    id: string;
    studentId: string;
    student: string;
    class: string;
    faculty: string;
    createdDate: Date;
    lecturer: string;
    approvalStatus: boolean | null;
}