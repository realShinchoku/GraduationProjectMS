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
    lecturersCount:number;
}

export class Period implements Period {
    constructor(init?: PeriodFormValues) {
        Object.assign(this, init);
    }
}

export class PeriodFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    city: string = '';
    venue: string = '';

    constructor(activity?: PeriodFormValues) {
        if (activity) {
            this.id = activity.id;
            this.title = activity.title;
            this.category = activity.category;
            this.description = activity.description;
            this.date = activity.date;
            this.city = activity.city;
            this.venue = activity.venue;
        }
    }
}