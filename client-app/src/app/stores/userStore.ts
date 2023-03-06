import {LoginFormValues, PasswordFormValues, User} from "../models/user";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {store} from "./store";
import {route, router} from "../router/Routers";

export default class UserStore {
    user: User | null = null;
    refreshTokenTimeout: any;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (formValues: LoginFormValues) => {
        try {
            const user = await agent.Account.login(formValues);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            });
            await router.navigate(route.home);
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
        store.commonStore.setToken(undefined);
        this.user = null;
        await router.navigate(route.login);
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
        } catch (err) {
            console.log(err);
        }
    }

    sendResetPasswordLink = async (email: string) => {
        try {
            await agent.Account.sendResetPasswordLink(email);
        } catch (e) {
            throw e;
        }

    }

    resetPassword = async (email: string, password: string, token: string) => {
        try {
            await agent.Account.resetPassword(email, password, token);
        } catch (e) {
            throw e;
        }
    }

    changePassword = async (values: PasswordFormValues) => {
        try {
            await agent.Account.changePassword(values);
        } catch (e: any) {
            throw e.response.data;
        }
    }

    // setImage = (image: string) => {
    //     if (this.user)
    //         this.user.image = image;
    // }

}