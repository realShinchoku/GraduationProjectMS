import {DepartmentSubjectFilterItem} from "../models/departmentSubject";
import {makeAutoObservable} from "mobx";
import agent from "../api/agent";

export default class DepartmentSubjectStore {
    departmentSubjectFilterItems: DepartmentSubjectFilterItem[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    
    getFilterItem = async () =>{
        try {
            this.departmentSubjectFilterItems = await agent.DepartmentSubjects.listForFilter();
        }
        catch (e) {
            console.log(e);
        }
    }
}