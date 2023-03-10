import axios, {AxiosError, AxiosResponse} from "axios";
import {router} from "../router/Routers";
import {store, useStore} from "../stores/store";
import {LoginFormValues, PasswordFormValues, User} from "../models/user";
import {PaginationResult} from "../models/pagination";
import {Lecturer} from "../models/lecturer";
import {Student} from "../models/student";
import {GraduationProjectPeriod} from "../models/graduationProjectPeriod";
import {DepartmentSubjectFilterItem} from "../models/departmentSubject";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    });
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development')
        await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginationResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginationResult<any>>
    }
    return response;
}, async (error: AxiosError) => {
    const {data, status, config, headers} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (typeof (data) === "string")
                console.log('Bad request');
            else if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                await router.navigate('/not-found');
            } else if (data.errors) {
                const modelStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key])
                        modelStateErrors.push(data.errors[key]);
                }
                if (modelStateErrors.length > 0)
                    throw modelStateErrors.flat();
            }
            break;
        case 401:
            if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token')) {
                console.log('Session expired - please login again');
                await useStore().userStore.logout();
            }
            break;
        case 403:
            console.log('Forbidden');
            break;
        case 404:
            await router.navigate('/not-found');
            break;
        case 409:
            throw data;
        case 500:
            store.commonStore.setServerError(data);
            await router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
});

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    getList: <T>(url: string, config: {}) => axios.get<T>(url, config).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: LoginFormValues) => requests.post<User>('/account/login', user),
    sendResetPasswordLink: (email: string) => requests.post<void>(`/account/sendResetPasswordLink?email=${email}`, {}),
    resetPassword: (email: string, password: string, token: string) => requests.put<void>(`/account/resetPassword`, {
        email,
        password,
        token
    }),
    changePassword: (values: PasswordFormValues) => requests.put<void>('/account/changePassword', values),
}

const Lecturers = {
    list: (params: URLSearchParams) => requests.getList<PaginationResult<Lecturer[]>>('/lecturer', {params}),
}

const Students = {
    list: () => requests.get<Student[]>('/student'),
    confirmLecturer: () => requests.post<void>('/student/lecturer/confirm', {}),
    choseLecturer: (id: string) => requests.post<void>(`/api/student/lecturer/${id}`, {id}),
}

const GraduationProjectPeriods = {
    create: (period: GraduationProjectPeriod) => requests.post<void>('/period', {period}),
    list: () => requests.get<GraduationProjectPeriod[]>('/period'),
    single: (id: string) => requests.get<GraduationProjectPeriod>(`/period/${id}`),
}

const DepartmentSubjects = {
    confirmLecturer: (studentId: string, lecturerId: string) => requests.post<void>('/departmentSubjects/lecturer/confirm', {
        studentId,
        lecturerId
    }),
    assignLecturer: (studentId: string, lecturerId: string) => requests.post<void>('/departmentSubjects/lecturer/assign', {
        studentId,
        lecturerId
    }),
    listForFilter: () => requests.get<DepartmentSubjectFilterItem[]>('/departmentSubject/listForFilter')
}

const agent = {
    Account,
    Lecturers,
    Students,
    GraduationProjectPeriods,
    DepartmentSubjects,
}

export default agent;
