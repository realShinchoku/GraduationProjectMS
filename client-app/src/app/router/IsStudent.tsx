import {Navigate, Outlet} from "react-router-dom";
import {Grid} from "@mui/material";
import {useStore} from "../stores/store";
import {Role} from "../models/user";
import {route} from "./Routers";
import {observer} from "mobx-react-lite";
import StudentSidebar from "../layout/Sidebar/StudentSidebar";

function IsStudent() {
    const {userStore:{getRole}} = useStore();
    
    if(getRole !== Role.Student)
        return <Navigate to={route.home}/>;
    
    return (
        <Outlet/>
    )
}

export default observer(IsStudent);