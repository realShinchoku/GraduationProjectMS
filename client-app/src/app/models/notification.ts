import {Student} from "./student";

export interface Notification {
    id: string;
    name: string;
    createdDate: Date;
    student: Student;
    infoTitle: string;
    infos: Info[];
    isRead: boolean;
}

export interface Info {
    key: string;
    value: string;
}