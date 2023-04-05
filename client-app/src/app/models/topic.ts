export class TopicFormValue {
    constructor(topic?:Topic) {
        if (topic) {
            this.id = topic.id;
            this.type = topic.type;
            this.name = topic.name;
            this.description = topic.description;
        }

    }
    id: string = "";
    type: string = "";
    name: string = "";
    description: string = "";
}
export class Topic implements Topic {
    constructor(init?:TopicFormValue) {
        Object.assign(this, init)
    }
}
export interface Topic {
    id: string,
    name: string,
    type: string,
    description: string,
    status: number,
}

export interface TopicDto {
    id: string;
    studentId: string;
    studentName: string;
    class: string;
    faculty: string;
    type: string;
    name: string;
    lecturer: string;
    lecturerApproval: boolean;
    departmentSubjectApproval: boolean;
}
