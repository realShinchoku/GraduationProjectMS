import {useStore} from "../stores/store";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import Sidebar from "../layout/Sidebar/Sidebar";
import Header from "../layout/Header/Header";
import {Grid} from "@mui/material";
import "../../assets/css/config/_reset.scss"
import {route} from "./Routers";
import {observer} from "mobx-react-lite";

function RequireAuth() {
    const {userStore, commonStore: {sideBarState}} = useStore();
    const location = useLocation();


    if (!userStore.isLoggedIn)
        return <Navigate to={route.login} state={{from: location}}/>

    return (
        <>
            <Header/>
            <Sidebar/>
            {/* <Sidebar1/> */}
            {/* <Sidebar2/> */}
            <Grid className={`container ${sideBarState}`}>
                <Outlet/>
            </Grid>
        </>
    )
}

export default observer(RequireAuth);
