import {makeAutoObservable, reaction, runInAction} from "mobx";
import {Pagination, PagingParams} from "../models/pagination";
import agent from "../api/agent";
import {Period, PeriodFormValues} from "../models/period";
import InstructorStore from "./instructorStore";
import StudentStore from "./studentStore";
import {store} from "./store";

export default class PeriodStore {
    periods = new Map<string, Period>();
    pagingParams = new PagingParams(0, 2);
    pagination: Pagination | null = null;
    loading: boolean = true;
    predicate = new Map();
    instructorStores = new Map<string, InstructorStore>();
    studentStores = new Map<string, StudentStore>();
    isInstructor = false;
    isAccount = false;

    constructor() {
        makeAutoObservable(this);
        reaction(() => this.predicate.values() || this.predicate.keys()
            ,
            async () => {
                this.pagingParams.pageNumber = 0;
                this.periods.clear()
                await this.loadList();
            });

        reaction(() => this.isAccount || this.isInstructor,
            async () => {
                this.periods.clear()
                await this.loadList();
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

    loadList = async () => {
        this.loading = true;
        try {
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
        await this.studentStores.get(periodId)!.setPeriodId(periodId, this.isInstructor);
    }

    setInstructorStatus = () => this.isInstructor = true;
    setAccountStatus = () => this.isAccount = true;

    create = async (period: PeriodFormValues) => {
        try {
            await agent.Periods.create(period)
            const newPeriod = new Period(period);
            await this.setItem(newPeriod);
            store.modalStore.closeModal();
            
        } catch (e) {
            console.log(e);
            store.snackBarStore.error("Có lỗi xảy ra");
            throw e;
        }
    }
    edit = async (period: PeriodFormValues) => {
        try {
            await agent.Periods.edit(period)
            const editPeriod = new Period(period);
            await this.setItem(editPeriod);
            store.modalStore.closeModal();
            
        } catch (e) {
            console.log(e);
            store.snackBarStore.error("Có lỗi xảy ra");
            throw e;
        }
    }

    get = async (id: string) => {
        let item = this.getItem(id);
        if (item)
            return item;
        else {
            try {
                item = await agent.Periods.single(id);
                await this.setItem(item);
                return item;
            } catch (e) {
                console.log(e);
            }
        }
    }

    private setItem = async (period: Period) => {
        period.startDate = new Date(period.startDate);
        period.endDate = new Date(period.endDate);
        period.contactInstructorTime = new Date(period.contactInstructorTime);
        period.registerTopicTime = new Date(period.registerTopicTime);
        period.syllabusSubmissionTime = new Date(period.syllabusSubmissionTime);
        period.syllabusReviewTime = new Date(period.syllabusReviewTime);
        period.graduationProjectTime = new Date(period.graduationProjectTime);
        period.protectionTime = new Date(period.protectionTime);
        this.periods.set(period.id, period);
        if (this.isInstructor) {
            await this.setInstructorStore(period.id);
            await this.setStudentStore(period.id);
        }
        if (this.isAccount) {
            await this.setStudentStore(period.id);
        }
    }

    private getItem = (id: string) => {
        return this.periods.get(id);
    }
}