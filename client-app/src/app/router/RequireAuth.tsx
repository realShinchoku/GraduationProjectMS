import {useStore} from "../stores/store";
import {Outlet, useLocation} from "react-router-dom";
import Sidebar from "../layout/Sidebar/Sidebar";
import Header from "../layout/Header/Header";

export default function RequireAuth() {
    const {userStore: {isLoggedIn}} = useStore();
    const location = useLocation();

    // if (!isLoggedIn)
    //     return <Navigate to={route.login} state={{from: location}}/>

    return (
        <>
            <Header/>
            <Sidebar/>
            <Outlet/>
        </>
    )
}