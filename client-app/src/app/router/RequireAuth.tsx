import {useStore} from "../stores/store";
import {Outlet, useLocation} from "react-router-dom";
import Header from "../layout/Header/Header";
import Sidebar from "../layout/Sidebar/Sidebar";

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