import {makeAutoObservable, reaction, runInAction} from "mobx";
import {DepartmentSubjectFilterItem} from "../models/filterItem";
import agent from "../api/agent";

export default class FilterItemsStore {
    departmentSubjects: DepartmentSubjectFilterItem[] = [];
    courses: number[] = [];
    selectedCourse: number | null = null;
    phases: number[] = [];

    constructor() {
        makeAutoObservable(this);
        reaction(() => this.selectedCourse, this.getPhases)
    }

    getDepartmentSubjects = async () => {
        try {
            const filterItem = await agent.FilterItems.DepartmentSubject();
            runInAction(() => this.departmentSubjects = filterItem);
        } catch (e) {
            console.log(e);
        }
    }

    getCourses = async () => {
        try {
            const filterItem = await agent.FilterItems.Courses();
            runInAction(() => this.courses = filterItem);
        } catch (e) {
            console.log(e);
        }
    }

    getPhases = async () => {
        try {
            const params = new URLSearchParams();
            if (this.selectedCourse != null) {
                params.append('course', this.selectedCourse.toString());
            }
            const response = await agent.FilterItems.Phases(params);
            runInAction(() => this.phases = response.data);
        } catch (e) {
            console.log(e);
        }
    }

    setCourse = (course: number | null) => this.selectedCourse = course;
}