import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../layout/App";
import NotFound from "../../features/Error/NotFound";
import ServerError from "../../features/Error/ServerError";
import RequireAuth from "./RequireAuth";
import Test from "../../features/Test/Test";
import Login from "../../features/Account/Login";
import PasswordReset from "../../features/Account/PasswordReset";
import PasswordResetToken from "../../features/Account/PasswordResetToken";
import RequireNonAuth from "./RequireNonAuth";
import HomePage from "../../features/pages/HomePage";


export const route = {
    login: '/login',
    resetPassword: '/account/password_reset',
    confirmResetPassword: '/account/password_reset/with',
    homepage: '/homepage',
};

export const routes: RouteObject[] = [
    {
        path: '',
        element: <App/>,
        children: [
            {
                path: '/', element: <RequireAuth/>, children: [
                    // {path: 'homepage', element: <HomePage/>},
                ]
            },
            {
                path: '/', element: <RequireNonAuth/>, children: [
                    {path: 'homepage', element: <HomePage/>},
                    {path: 'login', element: <Login/>},
                    {path: 'account/password_reset', element: <PasswordReset/>},
                    {path: 'account/password_reset/with', element: <PasswordResetToken/>},
                ]
            },
            {path: 'not-found', element: <NotFound/>},
            {path: 'server-error', element: <ServerError/>},
            {path: 'test', element: <Test/>},
            {path: '*', element: <Navigate replace to={'/not-found'}/>},
        ],
    }
]
export const router = createBrowserRouter(routes);