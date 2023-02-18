import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../layout/App";
import NotFound from "../../features/Error/NotFound";
import ServerError from "../../features/Error/ServerError";
import RequireAuth from "./RequireAuth";
import Login from "../../features/Account/Login/Login";
import Test from "../../features/Test/Test";
import ResetPassword from "../../features/Account/ResetPassword/ResetPassword";
import ResetPasswordEmailForm from "../../features/Account/ResetPassword/ResetPasswordEmailForm";


export const route = {
    login:'/account/login',
    resetPassword: '/account/recover',
    confirmResetPassword: '/account/recover/password'
};

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                element: <RequireAuth/>, children: []
            },
            {path: 'not-found', element: <NotFound/>},
            {path: 'server-error', element: <ServerError/>},

            {path: 'account/login', element: <Login/>},
            {path: 'account/recover', element: <ResetPasswordEmailForm/>},
            {path: 'test', element: <Test/>},
            {path: '*', element: <Navigate replace to={'/not-found'}/>},
        ],
    }
]
export const router = createBrowserRouter(routes);