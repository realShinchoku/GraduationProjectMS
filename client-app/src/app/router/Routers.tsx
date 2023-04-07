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
import AccountStudent from "../../features/AccountManagement/Student/AccountStudent";
import TopicAssignment from "../../features/TopicAssignment/TopicAssignment";
import Notification from "../../features/Notification/Notification";
import Document from "../../features/Document/Document";
import AccountDepartmentSubject from "../../features/AccountManagement/DepartmentSubject/AccountDepartmentSubject";
import OutlineTable from "../../features/Outline/OutlineTable";
import StudentTopic from "../../features/StudentTopic/StudentTopic";
import Approval from "../../features/Approval/Approval";
import ApprovalTable from "../../features/Approval/ApprovalTable";
import Outline from "../../features/Outline/Outline";
import DocumentOutline from "../../features/Document/DocumentOutline";
import DocumentReport from "../../features/Document/DocumentReport";
import RequireRole from "./RequireRole";
import {Role} from "../models/user";


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
    notification: '/notification',
    document: '/document',
    project: '/project',
    projectDetail: (id: string, name: string) => {
        return `/project/${id}?name=${name}`
    },
    outline: '/outline',
    outlineDetail: (id: string) => {
        return `/outline/${id}`
    },
    projectAssignment: (id: string) => {
        return `/project/assignment/${id}`
    },
};

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                element: <RequireAuth/>, children: [
                    {
                        element: <RequireRole roles={[Role.Student]} key={Role.Student}/>, children: [
                            {path: 'lecturer', element: <LecturerList/>},
                            {path: 'topic', element: <StudentTopic/>},
                            {path: 'notification', element: <Notification/>},
                            {path: 'document', element: <Document/>},
                            {path: 'document/outline', element: <DocumentOutline/>},
                            {path: 'document/report', element: <DocumentReport/>},
                        ]
                    },
                    {
                        element: <RequireRole roles={[Role.Lecturer]} key={Role.Lecturer}/>, children: []
                    }
                    ,
                    {
                        element: <RequireRole roles={[Role.DepartmentSubject]} key={Role.DepartmentSubject}/>,
                        children: [
                            {path: 'instructor', element: <Instructor/>},
                            {path: 'project/assignment/:id', element: <TopicAssignment/>},
                        ]
                    },
                    {
                        element: <RequireRole roles={[Role.DepartmentSubject, Role.Lecturer]}
                                              key={Role.DepartmentSubject + Role.Lecturer}/>, children: [
                            {path: 'project', element: <Approval/>},
                            {path: 'project/:id', element: <ApprovalTable/>},
                            {path: 'outline', element: <Outline/>},
                            {path: 'outline/:id', element: <OutlineTable/>},
                        ]
                    },
                    {
                        element: <RequireRole roles={[Role.FacultyOffice]} key={Role.FacultyOffice}/>, children: [
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
            {path: 'de-cuong-bo-mon', element: <Outline/>},
            {path: 'de-tai-bo-mon', element: <Approval/>},
        ],
    }
]
export const router = createBrowserRouter(routes);
