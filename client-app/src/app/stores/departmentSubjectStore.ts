import {DepartmentSubjectFilterItem} from "../models/departmentSubject";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";

export default class DepartmentSubjectStore {
    departmentSubjectFilterItems: DepartmentSubjectFilterItem[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getFilterItem = async () => {
        try {
            const filterItem = await agent.DepartmentSubjects.listForFilter();
            runInAction(() => this.departmentSubjectFilterItems = filterItem);
        } catch (e) {
            console.log(e);
        }
    }
}