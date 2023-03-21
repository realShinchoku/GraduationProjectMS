import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../layout/App";
import NotFound from "../../features/Error/NotFound";
import ServerError from "../../features/Error/ServerError";
import RequireAuth from "./RequireAuth";
import Test from "../../features/Test/Test";
import PasswordReset from "../../features/Account/PasswordReset";
import PasswordResetToken from "../../features/Account/PasswordResetToken";
import RequireNonAuth from "./RequireNonAuth";
import Login from "../../features/Account/Login";
import HomePage from "../../features/Homepage/HomePage";
import LecturerList from "../../features/Lecturers/List/LecturerList";
import AccountManagement from "../../features/AccountManagement/AccountManagement";
import Instructor from "../../features/Instructor/Instructor";
import Period from "../../features/GraduationPeriod/Period";
import IsStudent from "./IsStudent";
import IsLecturer from "./IsLecturer";
import IsDepartmentSubject from "./IsDepartmentSubject";
import IsFaculty from "./IsFaculty";


export const route = {
    home: '/',
    login: '/login',
    resetPassword: '/account/password_reset',
    confirmResetPassword: '/account/password_reset/with',
    lecturer: '/lecturer',
    empty: 'null',
    instructor: '/instructor',
    period: '/period',
    notFound: '/not_found'
};

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                element: <RequireAuth/>,children: [
                    {element: <IsStudent/>, children: [
                            {path: 'lecturer', element: <LecturerList/>},
                        ]
                    },
                    {element: <IsLecturer/>, children: [
                        ]}
                    ,
                    {element: <IsDepartmentSubject/>, children: [
                            {path: 'instructor', element: <Instructor/>},
                        ]
                    },
                    {element: <IsFaculty/>, children: [
                            {path: 'period', element: <Period/>},
                            {path: 'account/management', element: <AccountManagement/>},
                        ]
                    },
                    {path: '', element: <HomePage/>},
                ]
            },
            {
                element: <RequireNonAuth/>, children: [
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
