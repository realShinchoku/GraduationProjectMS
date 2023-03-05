import {ServerError} from "../models/serverError";
import {makeAutoObservable, reaction} from "mobx";
import Cookies from "js-cookie";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | undefined = Cookies.get('jwt');
    appLoaded: boolean = false;
    isActive: string = '';

    constructor() {
        makeAutoObservable(this);

        reaction(() => this.token,
            token => {
                if (token)
                    Cookies.set('jwt', token);
                else
                    Cookies.remove('jwt');
            })
    }

    setServerError(err: ServerError) {
        this.error = err;
    }

    setToken = (token: string | undefined) => {
        this.token = token;
    }

    setAppLoaded = () => this.appLoaded = true;

    openSideBar = () => this.isActive = 'active';
    closeSideBar = () => this.isActive = '';

}