import {useStore} from "../stores/store";
import {Navigate, Outlet} from "react-router-dom";

export default function RequireAuth() {
    const {userStore: {isLoggedIn}} = useStore();

    if (isLoggedIn)
        return <Navigate to={'/'}/>

    return <Outlet/>
}