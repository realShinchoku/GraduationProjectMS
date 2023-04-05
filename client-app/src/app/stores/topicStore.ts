import { runInAction } from 'mobx';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { store } from './store';
import { Topic } from '../models/topic';

export default class TopicStore {
    topic: Topic | null = null;
    loading: boolean = false;
    constructor() {
        makeAutoObservable(this);
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
        finally{this.loading = false};
    }
}