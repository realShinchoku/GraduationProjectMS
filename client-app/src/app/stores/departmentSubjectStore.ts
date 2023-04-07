import {makeAutoObservable, reaction, runInAction} from "mobx";
import {Pagination, PagingParams} from "../models/pagination";
import agent from "../api/agent";
import {DepartmentSubject} from "../models/departmentSubject";
import {store} from "./store";

export default class DepartmentSubjectStore {
    departmentSubjects = new Map<string, DepartmentSubject>();
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
                await this.loadItems();
            });

        reaction(() => this.pagingParams,
            async () => {
                await this.loadItems();
            });
    }

    get departmentSubjectsList() {
        return Array.from(this.departmentSubjects.values());
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => params.append(key, value));
        return params;
    }

    loadItems = async () => {
        this.loading = true;
        try {
            runInAction(() => this.departmentSubjects.clear());
            const result = await agent.DepartmentSubjects.list(this.axiosParams);
            this.setPagination(result.pagination);
            result.data.forEach(departmentSubject => {
                this.setItem(departmentSubject);
            });
        } catch (err) {
            console.log(err);
        } finally {
            runInAction(() => this.loading = false);
        }
    }
    setPagination = (pagination: Pagination) => this.pagination = pagination;

    setPagingParams = (pagingParams: PagingParams) => this.pagingParams = pagingParams;
    setPredicate = (predicate: string, value: string | number | boolean) => {
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

    create = async (email: string, displayName: string, username: string, phoneNumber: string) => {
        try {
            await agent.Account.createDepartmentSubject(email, displayName, username, phoneNumber);
            await this.loadItems();
            store.modalStore.closeModal();
            store.snackBarStore.success("Tạo thành công");
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    private setItem = (departmentSubject: DepartmentSubject) => {
        this.departmentSubjects.set(departmentSubject.id, departmentSubject);
    }
}