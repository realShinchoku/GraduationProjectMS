import {Student} from "./student";

export interface GraduationProjectPeriod {
    id: string;
    name: string;
    contactInstructorTime: Date;
    registerTopicTime: Date;
    syllabusSubmissionTime: Date;
    syllabusReviewTime: Date;
    graduationProjectTime: Date;
    protectionTime: Date;
    students: Student[];
}