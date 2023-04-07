import {makeAutoObservable, reaction, runInAction} from "mobx";
import {Lecturer} from "../models/lecturer";
import agent from "../api/agent";
import {Pagination, PagingParams} from "../models/pagination";
import {store} from "./store";

export default class LecturerStore {

    lecturers = new Map<string, Lecturer>();
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
                await this.loadLecturers();
            });

        reaction(() => this.pagingParams,
            async () => {
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

    create = async (email: string, displayName: string, education: string, phoneNumber: string, departmentSubjectId: string) => {
        try {
            await agent.Account.createLecturer(email, displayName, education, phoneNumber, departmentSubjectId);
            this.loadLecturers();
            store.modalStore.closeModal();
            store.snackBarStore.success("Tạo thành công");
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    private setLecturer = (lecturer: Lecturer) => {
        switch (lecturer.instructorStatus) {
            case 0:
                lecturer.lecturerStatus = 'Tiếp nhận';
                break;
            case 1:
                lecturer.lecturerStatus = 'Chờ duyệt';
                break;
            case 2:
                lecturer.lecturerStatus = 'Từ chối';
                break;
        }
        lecturer.birthday = new Date(lecturer.birthday!)
        this.lecturers.set(lecturer.id, lecturer);
    }
}