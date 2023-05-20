import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {Notification} from "../models/notification";
import {store} from "./store";

export default class NotificationStore {
    notifications = new Map<string, Notification>();
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get listNotifications() {
        return Array.from(this.notifications.values());
    }

    loadList = async () => {
        this.loading = true;
        try {
            this.notifications.clear();
            const notifications = await agent.Notifications.list();
            runInAction(() => notifications.forEach(notification => {
                this.notifications.set(notification.id, notification);
            }));
        } catch (e) {
            console.log(e);
        } finally {
            this.loading = false;
        }
    }

    markAsRead = async (id: string) => {
        try {
            await agent.Notifications.markAsRead(id);
            runInAction(() => this.notifications.delete(id));
            store.modalStore.closeModal();
            store.snackBarStore.success("Xác nhận thành công")
        } catch (err) {
            store.snackBarStore.error("Có lỗi xảy ra");
            throw err;
        }
    }
}