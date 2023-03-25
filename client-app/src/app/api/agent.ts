import axios, {AxiosError, AxiosResponse} from "axios";
import {router} from "../router/Routers";
import {store, useStore} from "../stores/store";
import {LoginFormValues, PasswordFormValues, User} from "../models/user";
import {PaginationResult} from "../models/pagination";
import {Lecturer} from "../models/lecturer";
import {Student} from "../models/student";
import {DepartmentSubjectFilterItem} from "../models/filterItem";
import {Instructor} from "../models/instructor";
import {Period, PeriodFormValues} from "../models/period";

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
    list: <T>(url: string, config: {}) => axios.get<PaginationResult<T>>(url, config).then(responseBody),
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
    createStudent: (file: any, periodId: string) => {
        let formData = new FormData();
        formData.append('File', file);
        formData.append('HasHeader', 'true');
        formData.append('PeriodId', periodId);
        return axios.post<void>('/account/student', formData, {
            headers: {'Content-Type': 'application/form-data'}
        })
    },
    createLecturer: (email: string, displayName: string, education: string, phoneNumber: string, departmentSubjectId: string) => requests.post<void>('/account/lecturer', {
        email,
        displayName,
        education,
        phoneNumber,
        departmentSubjectId
    }),
    createDepartmentSubject: (email: string, displayName: string, username: string, phoneNumber: string) => requests.post<void>('/account/departmentSubject', {
        email,
        displayName,
        username,
        phoneNumber
    })
}

const Lecturers = {
    list: (params: URLSearchParams) => requests.list<Lecturer[]>('/lecturer', {params}),
}

const Students = {
    list: (params: URLSearchParams) => requests.list<Student[]>('/student', {params}),
    confirmLecturer: () => requests.post<void>('/student/lecturer/confirm', {}),
}

const Periods = {
    create: (period: PeriodFormValues) => requests.post<void>('/period', period),
    edit: (period: PeriodFormValues) => requests.put<void>('/period', period),
    list: (params: URLSearchParams) => requests.list<Period[]>('/period', {params}),
    single: (id: string) => requests.get<Period>(`/period/${id}`),
}

const DepartmentSubjects = {}

const FilterItems = {
    DepartmentSubject: () => requests.get<DepartmentSubjectFilterItem[]>('/filterItems/departmentSubject'),
    Courses: () => requests.get<number[]>('filterItems/course'),
    Phases: (params: URLSearchParams) => axios.get<number[]>(`filterItems/phase`, {params}),
}

const Instructors = {
    list: (params: URLSearchParams, periodId: string) => requests.list<Instructor[]>(`/instructor?periodId=${periodId}`, {params}),
    chose: (id: string) => requests.post(`/instructor/chose/${id}`, {}),
    approval: (instructorId: string, status: number, note: string) => requests.post('/instructor/approval', {
        instructorId,
        status,
        note
    }),
    assign: (studentId: string, lecturerId: string) => requests.post(`/instructor/assign`, {studentId, lecturerId}),
}

const agent = {
    Account,
    Lecturers,
    Students,
    Periods,
    DepartmentSubjects,
    Instructors,
    FilterItems
}

export default agent;
