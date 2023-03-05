import {makeAutoObservable, reaction, runInAction} from "mobx";
import {Lecturer} from "../models/lecturer";
import agent from "../api/agent";
import {Pagination, PagingParams} from "../models/pagination";

export default class LecturerStore {

    lecturers = new Map<string, Lecturer>();
    pagingParams = new PagingParams();
    pagination: Pagination | null = null;
    loading: boolean = true;
    predicate = new Map();

    constructor() {
        makeAutoObservable(this);
        reaction(() => this.predicate.keys(),
            async () => {
                this.pagingParams.pageNumber = 0;
                await this.loadLecturers();
            });
    }

    get lecturersList() {
        return Array.from(this.lecturers.values());
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => params.append(key, value));
        return params;
    }

    loadLecturers = async () => {
        this.loading = true;
        try {
            runInAction(() => this.lecturers.clear());
            const result = await agent.Lecturers.list(this.axiosParams);
            result.data.forEach(lecturer => {
                this.setLecturer(lecturer);
            });
            this.setPagination(result.pagination);
        } catch (err) {
            console.log(err)
        }
        finally {
            runInAction(() => this.loading = false);
        }
    }
    setPagination = (pagination: Pagination) => this.pagination = pagination;

    setPagingParams = (pagingParams: PagingParams) => this.pagingParams = pagingParams;
    setPredicate = (predicate: string, value: string | number) => {
        if(this.predicate.get(predicate))
            this.removePredicate(predicate);
        
        if(value === null || value === '')
            return this.removePredicate(predicate);
        
        this.predicate.set(predicate, value);
    }
    removePredicate = (predicate: string) => {
        this.predicate.delete(predicate);
    }
    resetPredicate = () => {
        this.predicate.clear();
    }
    private setLecturer = (lecturer: Lecturer) => {
        lecturer.birthday = new Date(lecturer.birthday!)
        this.lecturers.set(lecturer.id, lecturer);
    }
}