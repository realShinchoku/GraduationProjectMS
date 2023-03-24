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
import HomePage from "../../features/Hompage/HomePage";
import LecturerList from "../../features/Lecturers/List/LecturerList";
import AccountManagement from "../../features/AccountManagement/Student/AccountManagement";
import Instructor from "../../features/Instructor/Instructor";
import Period from "../../features/GraduationPeriod/Period";
import IsStudent from "./IsStudent";
import IsLecturer from "./IsLecturer";
import IsDepartmentSubject from "./IsDepartmentSubject";
import IsFaculty from "./IsFaculty";
import DepartmentSubject from "../../features/AccountManagement/DepartmentSubject/DepartmentSubject";
import AccountLecturers from "../../features/AccountManagement/Lecturers/AccountLecturers";



export const route = {
    login: '/login',
    resetPassword: '/account/password_reset',
    confirmResetPassword: '/account/password_reset/with',
    home: '/',
    lecturer: '/lecturer',
    empty: 'null',
    instructor: '/instructor',
    period: '/period',
    notFound: '/not_found',
    accountStudent: '/account/student',
    accountDepartmentSubject: '/account/departmentSubject',
    accountLecturer: '/account/lecturer',

};

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                element: <RequireAuth/>, children: [
                    {
                        element: <IsStudent/>, children: [
                            {path: 'lecturer', element: <LecturerList/>},
                        ]
                    },
                    {
                        element: <IsLecturer/>, children: []
                    }
                    ,
                    {
                        element: <IsDepartmentSubject/>, children: [
                            {path: 'instructor', element: <Instructor/>},
                        ]
                    },
                    {
                        element: <IsFaculty/>, children: [
                            {path: 'period', element: <Period/>},
                            {path: 'account/student', element: <AccountManagement/>},
                            {path: 'account/departmentSubject', element: <DepartmentSubject/>},
                            {path: 'account/lecturer', element: <AccountLecturers/>},

                        ]
                    },
                    {path: '', element: <HomePage/>},
                    {path: 'lecturer', element: <LecturerList/>},
                    {path: 'accountmanagement', element: <AccountManagement/>},
                    {path: 'studentmanagement', element: <StudentManagement/>},

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
            {path: 'accountmanagement', element: <AccountManagement/>},

        ],
    }
]
export const router = createBrowserRouter(routes);
