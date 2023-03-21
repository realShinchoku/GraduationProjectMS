import {makeAutoObservable, reaction, runInAction} from "mobx";
import {Instructor} from "../models/instructor";
import {Pagination, PagingParams} from "../models/pagination";
import agent from "../api/agent";

export default class InstructorStore {
    periodId: string | null = null;
    instructors = new Map<string, Instructor>();
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


    get instructorsList() {
        return Array.from(this.instructors.values());
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
            runInAction(() => this.instructors.clear());
            const result = await agent.Instructors.list(this.axiosParams, this.periodId!);
            result.data.forEach(instructor => {
                this.setItem(instructor);
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
    setPredicate = (predicate: string, value: string | number) => {
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

    setPeriodId = async (id: string) => {
        this.periodId = id;
        await this.loadLists();
    }

    chose = async (id: string) => {
        try {
            await agent.Instructors.chose(id);
        } catch (e) {
            console.log(e);
        }
    }

    approval = async (id: string, status: number, note: string) => {
        try {
            await agent.Instructors.approval(id, status, note);
            runInAction(() => {
                this.instructors.delete(id);
            })
        } catch (e) {
            console.log(e);
        }
    }

    assign = async (studentId: string, lecturerId: string) => {
        try {
            await agent.Instructors.assign(studentId, lecturerId);
        } catch (e) {
            console.log(e);
        }
    }

    private setItem = (instructor: Instructor) => {
        this.instructors.set(instructor.id, instructor);
    }
}