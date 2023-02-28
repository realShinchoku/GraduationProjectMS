import {ServerError} from "../models/serverError";
import {makeAutoObservable, reaction} from "mobx";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = localStorage.getItem('jwt');
    appLoaded: boolean = false;
    isActive: string = '';

    constructor() {
        makeAutoObservable(this);

        reaction(() => this.token,
            token => {
                if (token)
                    localStorage.setItem('jwt', token);
                else
                    localStorage.removeItem('jwt');
            })
    }

    setServerError(err: ServerError) {
        this.error = err;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => this.appLoaded = true;

    openSideBar = () => this.isActive = 'active';
    closeSideBar = () => this.isActive = '';

}