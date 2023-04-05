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
import LecturerList from "../../features/Lecturers/List/LecturerList"
import AccountLecturer from "../../features/AccountManagement/Lecturer/AccountLecturer";
import Instructor from "../../features/Instructor/Instructor";
import Period from "../../features/GraduationPeriod/Period";
import IsStudent from "./IsStudent";
import IsLecturer from "./IsLecturer";
import IsDepartmentSubject from "./IsDepartmentSubject";
import IsFaculty from "./IsFaculty";
import AccountStudent from "../../features/AccountManagement/Student/AccountStudent";
import StudentTopic from "../../features/StudentTopic/StudentTopic";
import AccountDepartmentSubject from "../../features/AccountManagement/DepartmentSubject/AccountDepartmentSubject";
import TopicAssignment from "../../features/TopicAssignment/TopicAssignment";
import TopicAssignmentModal from "../../features/TopicAssignment/TopicAssignmentModal";


export const route = {
    home: '/',
    login: '/login',
    resetPassword: '/account/password_reset',
    confirmResetPassword: '/account/password_reset/with',
    lecturer: '/lecturer',
    topic: '/topic',
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
                            {path: 'topic', element: <StudentTopic/>},
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
                            {path: 'account/student', element: <AccountStudent/>},
                            {path: 'account/departmentSubject', element: <AccountDepartmentSubject/>},
                            {path: 'account/lecturer', element: <AccountLecturer/>},

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
            {path: 'topic/assignment/:id', element: <TopicAssignment/>},

        ],
    }
]
export const router = createBrowserRouter(routes);
