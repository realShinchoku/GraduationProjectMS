import {reaction, runInAction} from 'mobx';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { store } from './store';
import {Topic, TopicDto} from '../models/topic';
import {Pagination, PagingParams} from "../models/pagination";
import {Instructor} from "../models/instructor";

export default class TopicStore {
    topic: Topic | null = null;
    loading: boolean = false;
    
    topics = new Map<string, TopicDto>();
    pagingParams = new PagingParams();
    pagination: Pagination | null = null;
    predicate = new Map();
    periodId: string = '';
    constructor() {
        makeAutoObservable(this);
        reaction(() => this.predicate.values() || this.predicate.keys()
            ,
            async () => {
                this.pagingParams.pageNumber = 0;
                await this.loadList();
            });

        reaction(() => this.pagingParams,
            async () => {
                await this.loadList();
            });
    }
    create = async (name : string, type: string, description: string) => {
        this.loading = true;
        try {
            const topic = await agent.Topics.create(name, type, description);
            runInAction(()=>this.topic = topic);
            store.modalStore.closeModal();
            store.snackBarStore.success('Bạn đã tạo thành công');
        } catch (error) {
            store.snackBarStore.error('Có lỗi xảy ra');
            throw error;
        }
        finally{this.loading = false};
    }
    get = async (id: string = '') => {
        this.loading = true;
        try {
            if(id === '')
                id = store.userStore.user!.id;
            const topic = await agent.Topics.get(id);
            runInAction(()=>this.topic = topic);
        } catch (error) {
            runInAction(()=>this.topic = null);
            console.log(error);
        }
        finally{this.loading = false}
    }
    edit = async (id: string, name : string, type: string, description: string) => {
        this.loading = true;
        try {
            const topic = await agent.Topics.edit(id, name, type, description);
            runInAction(()=>this.topic = topic);
            store.modalStore.closeModal();
            store.snackBarStore.success('Bạn đã sửa thành công');
        } catch (error) {
            store.snackBarStore.error('Có lỗi xảy ra');
            throw error;
        }
        finally{this.loading = false}
    }

    get topicsList() {
        return Array.from(this.topics.values());
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
            runInAction(() => this.topics.clear());
            const result = await agent.Topics.list(this.axiosParams, this.periodId);
            result.data.forEach(item => {
                this.setItem(item);
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
    
    setPeriod = (periodId: string) => this.periodId = periodId;
    
    private setItem = (item: TopicDto) => {
        this.topics.set(item.id, item);
    }
}