export interface Period {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    contactInstructorTime: Date;
    registerTopicTime: Date;
    syllabusSubmissionTime: Date;
    syllabusReviewTime: Date;
    graduationProjectTime: Date;
    protectionTime: Date;
    studentsCount: number;
    syllabiCount: number;
    classesCount: number;
    projectsCount: number;
    lecturersCount: number;
}

export class Period implements Period {
    constructor(init?: PeriodFormValues) {
        Object.assign(this, init);
    }
}

export class PeriodFormValues {
    id?: string = undefined;
    name: string = '';
    startDate: Date | null = null;
    endDate: Date | null = null;
    contactInstructorTime: Date | null = null;
    registerTopicTime: Date | null = null;
    syllabusSubmissionTime: Date | null = null;
    syllabusReviewTime: Date | null = null;
    graduationProjectTime: Date | null = null;
    protectionTime: Date | null = null;
    studentsCount: number = 0;
    syllabiCount: number = 0;
    classesCount: number = 0;
    projectsCount: number = 0;
    lecturersCount: number = 0;

    constructor(period?: PeriodFormValues) {
        if (period) {
            this.id = period.id;
            this.name = period.name;
            this.startDate = period.startDate;
            this.endDate = period.endDate;
            this.contactInstructorTime = period.contactInstructorTime;
            this.registerTopicTime = period.registerTopicTime;
            this.syllabusSubmissionTime = period.syllabusSubmissionTime;
            this.syllabusReviewTime = period.syllabusReviewTime;
            this.graduationProjectTime = period.graduationProjectTime;
            this.protectionTime = period.protectionTime;
            this.studentsCount = period.studentsCount;
            this.syllabiCount = period.syllabiCount;
            this.classesCount = period.classesCount;
            this.projectsCount = period.projectsCount;
            this.lecturersCount = period.lecturersCount;
        }
    }
}