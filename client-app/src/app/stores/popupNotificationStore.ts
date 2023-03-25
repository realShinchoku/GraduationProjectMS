import {makeAutoObservable, runInAction} from "mobx";
import {PopupNotification} from "../models/popupNotification";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {store} from "./store";

export default class PopupNotificationStore {
    popupNotification: PopupNotification | null = null;
    hubConnection: HubConnection | null = null;

    isConnected: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_CHAT_URL + '', {
                accessTokenFactory: () => store.userStore.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start().then(this.setIsConnected).catch(error => console.log('Error establishing the connection', error));

        this.hubConnection.on('GetPopup', (popupNotification: PopupNotification) =>
            runInAction(() => {
                this.popupNotification = popupNotification;
            })
        );

        this.hubConnection.on('ReceiveMaskAsRead', (response) =>
            runInAction(() => {
                if (response != null)
                    this.popupNotification = null;
            })
        );

        this.hubConnection.on('ReceivePopupNotification', async () => {
            await runInAction(async () => {
                await this.getPopup();
            })
        })
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().then(this.setIsConnected).catch(error => console.log('Error stopping connection', error));
    }

    clear = () => {
        this.popupNotification = null;
        this.stopHubConnection();
    }

    maskAsRead = async () => {
        try {
            await this.hubConnection?.invoke("MaskAsRead", this.popupNotification)
        } catch (e) {
            console.log(e)
        }
    }
    getPopup = async () => {
        try {
            await this.hubConnection?.invoke("GetPopupNotificationAsync")
        } catch (e) {
            console.log(e)
        }
    }

    sendPopup = async () => {
        try {
            await this.hubConnection?.invoke("SendPopupNotificationAsync")
        } catch (e) {
            console.log(e)
        }
    }

    setIsConnected = () => this.isConnected = !this.isConnected;
}