import {Navigate, Outlet} from "react-router-dom";
import {Grid} from "@mui/material";
import {useStore} from "../stores/store";
import {Role} from "../models/user";
import {route} from "./Routers";
import {observer} from "mobx-react-lite";
import DepartmentSubjectSidebar from "../layout/Sidebar/DepartmentSubjectSidebar";

function IsDepartmentSubject() {
    const {userStore:{getRole}} = useStore();
    
    if(getRole !== Role.DepartmentSubject)
        return <Navigate to={route.home}/>;
    
    return (
        <Outlet/>
    )
}

export default observer(IsDepartmentSubject);