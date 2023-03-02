import {useStore} from "../stores/store";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {route} from "./Routers";

function RequireAuth() {
    const {userStore} = useStore();
    
    if (userStore.isLoggedIn)
        return <Navigate to={route.home}/>

    return <Outlet/>
}

export default RequireAuth;