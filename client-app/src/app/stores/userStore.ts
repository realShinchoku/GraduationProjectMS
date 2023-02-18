import {PasswordFormValues, User, UserFormValues} from "../models/user";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {store} from "./store";
import {router} from "../router/Routers";

export default class UserStore {
    user: User | null = null;
    isSend = false;
    isReset = false;
    refreshTokenTimeout: any;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (formValues: UserFormValues) => {
        try {
            const user = await agent.Account.login(formValues);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => {
                this.user = user;
            });
            // store.modalStore.closeModal();
            // await router.navigate('/activities');
        } catch (err: any) {
            const error = {email: null, password: null}
            if (err.response.data.email)
                error.email = err.response.data.email[0];
            if (err.response.data.password)
                error.password = err.response.data.password[0];
            throw error;
        }
    }

    logout = async () => {
        store.commonStore.setToken(null);
        this.user = null;
        await router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => this.user = user);
        } catch (err) {
            console.log(err);
        }
    }

    register = async (formValues: UserFormValues) => {
        try {
            await agent.Account.register(formValues);
            // store.modalStore.closeModal();
        } catch (err) {
            throw err;
        }
    }

    sendResetPasswordLink = async (email: string) => {
        try {
            await agent.Account.sendResetPasswordLink(email);
            runInAction(() => this.isSend = true);
        } catch (e) {
            throw e;
        }

    }

    resetPassword = async (email: string, password: string, token: string) => {
        try {
            await agent.Account.resetPassword(email, password, token);
            runInAction(() => this.isReset = true);
        } catch (e) {
            throw e;
        }
    }

    changePassword = async (values: PasswordFormValues) => {
        try {
            await agent.Account.changePassword(values);
            await this.logout();
            await router.navigate('/login')
        } catch (e: any) {
            throw e.response.data;
        }
    }

    // setImage = (image: string) => {
    //     if (this.user)
    //         this.user.image = image;
    // }

    setDisplayName = (displayName: string) => {
        if (this.user)
            this.user.displayName = displayName;
    }


    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.Account.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (e) {
            console.log(e);
        }
    }

    private startRefreshTokenTimer(user: User) {
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (120 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}