import {makeAutoObservable, reaction, runInAction} from "mobx";
import {Pagination, PagingParams} from "../models/pagination";
import agent from "../api/agent";
import {Period} from "../models/period";
import InstructorStore from "./instructorStore";
import StudentStore from "./studentStore";

export default class PeriodStore {
    periods = new Map<string, Period>();
    pagingParams = new PagingParams();
    pagination: Pagination | null = null;
    loading: boolean = true;
    predicate = new Map();
    instructorStores = new Map<string, InstructorStore>();
    studentStores = new Map<string, StudentStore>();

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

    get periodsList() {
        return Array.from(this.periods.values());
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
            runInAction(() => this.periods.clear());
            const result = await agent.Periods.list(this.axiosParams);
            result.data.forEach(period => {
                this.setItem(period);
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

    setInstructorStore = async (periodId: string) => {
        this.instructorStores.set(periodId, new InstructorStore());
        await this.instructorStores.get(periodId)!.setPeriodId(periodId);
    }

    setStudentStore = async (periodId: string) => {
        this.studentStores.set(periodId, new StudentStore());
        await this.studentStores.get(periodId)!.setPeriodId(periodId);
    }

    private setItem = async (period: Period) => {
        this.periods.set(period.id, period);
        await this.setInstructorStore(period.id);
        await this.setStudentStore(period.id);
    }
}