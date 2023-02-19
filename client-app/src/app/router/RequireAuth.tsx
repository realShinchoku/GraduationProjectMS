import {useStore} from "../stores/store";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {route} from "./Routers";
import NavBar from "../layout/NavBar";
import ModalContainer from "../common/modal/ModalContainer";

export default function RequireAuth() {
    const {userStore: {isLoggedIn}} = useStore();
    const location = useLocation();

    if (!isLoggedIn)
        return <Navigate to={route.login} state={{from: location}}/>

    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}