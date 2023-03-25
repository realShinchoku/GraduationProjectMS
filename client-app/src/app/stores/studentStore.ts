import {makeAutoObservable, reaction, runInAction} from "mobx";
import {Student} from "../models/student";
import {Pagination, PagingParams} from "../models/pagination";
import agent from "../api/agent";
import {store} from "./store";

export default class StudentStore {
    students = new Map<string, Student>();
    pagingParams = new PagingParams();
    pagination: Pagination | null = null;
    loading: boolean = true;
    predicate = new Map();

    constructor() {
        makeAutoObservable(this);
        reaction(() => this.predicate.values() || this.predicate.keys()
            ,
            async () => {
                this.pagingParams.pageNumber = 0;
                await this.loadLists();
            });

        reaction(() => this.pagingParams,
            async () => {
                await this.loadLists();
            });
    }

    get studentsList() {
        return Array.from(this.students.values());
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => params.append(key, value));
        return params;
    }

    loadLists = async () => {
        this.loading = true;
        try {
            runInAction(() => this.students.clear());
            const result = await agent.Students.list(this.axiosParams);
            result.data.forEach(student => {
                this.setItem(student);
            });
            this.setPagination(result.pagination);
        } catch (err) {
            console.log(err);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    setPagination = (pagination: Pagination) => this.pagination = pagination;
    setPagingParams = (pagingParams: PagingParams) => this.pagingParams = pagingParams;
    setPredicate = (predicate: string, value: string | boolean) => {
        if (this.predicate.get(predicate) !== undefined)
            this.removePredicate(predicate);

        if (value === null || value === '')
            return this.removePredicate(predicate);

        this.predicate.set(predicate, value);
    }

    removePredicate = (predicate: string) => {
        this.predicate.delete(predicate);
    }

    resetPredicate = () => {
        this.predicate.clear();
    }

    setPeriodId = async (id: string, isInstructor: boolean) => {
        if(isInstructor)
            this.setPredicate('hasLecturer', false);
        this.setPredicate('periodId', id);
        await this.loadLists();
    }
    
    create = async (file: any, periodId: string) =>{
        try {
            await agent.Account.createStudent(file, periodId);
            store.modalStore.closeModal();
            store.snackBarStore.success("Tạo tài khoản thành công");
        }
        catch (e) {
            console.log(e);
        }
    }

    removeItem = (id: string) => {
        this.students.delete(id);
    }

    private setItem = (student: Student) => {
        this.students.set(student.id, student);
    }
}