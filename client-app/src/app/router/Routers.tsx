import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../layout/App";
import NotFound from "../../features/Error/NotFound";
import ServerError from "../../features/Error/ServerError";
import RequireAuth from "./RequireAuth";
import Login from "../../features/Account/Login/Login";

export const route = {};

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
            {path: 'login', element: <Login/>},
            {path: '*', element: <Navigate replace to={'/not-found'}/>},
        ],
    }
]
export const router = createBrowserRouter(routes);