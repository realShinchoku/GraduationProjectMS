import {makeAutoObservable, reaction, runInAction} from "mobx";
import {Lecturer} from "../models/lecturer";
import agent from "../api/agent";
import {Pagination, PagingParams} from "../models/pagination";

export default class LecturerStore {

    lecturers = new Map<string, Lecturer>();
    pagingParams = new PagingParams();
    pagination: Pagination | null = null;
    loading: boolean = true;

    constructor() {
        makeAutoObservable(this);
        reaction(() => {
            },
            async () => {
                this.pagingParams = new PagingParams();
                this.lecturers.clear();
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
        // this.predicate.forEach((value, key) => {
        //     if (key === 'startDate') {
        //         params.append(key, (value as Date).toISOString());
        //     } else {
        //         params.append(key, value);
        //     }
        // });
        return params;
    }

    loadLecturers = async () => {
        this.loading = true;
        try {
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

    private setLecturer = (lecturer: Lecturer) => {
        lecturer.birthday = new Date(lecturer.birthday!)
        this.lecturers.set(lecturer.id, lecturer);
    }
}