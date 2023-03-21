import {useStore} from "../stores/store";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import Header from "../layout/Header/Header";
import {Grid} from "@mui/material";
import "../../assets/css/config/_reset.scss"
import {route} from "./Routers";
import {observer} from "mobx-react-lite";
import {Role} from "../models/user";
import StudentSidebar from "../layout/Sidebar/StudentSidebar";
import DepartmentSubjectSidebar from "../layout/Sidebar/DepartmentSubjectSidebar";
import FacultySidebar from "../layout/Sidebar/FacultySidebar";

function RequireAuth() {
    const {commonStore: {sideBarState},userStore} = useStore();
    const location = useLocation();
    
    function sidebar(role : Role)
    {
        switch (role) {
            case Role.Student:
                return <StudentSidebar/>;
            case Role.Lecturer:
                return <></>;
            case Role.DepartmentSubject:
                return <DepartmentSubjectSidebar/>;
            case Role.FacultyOffice:
                return <FacultySidebar/>;
        }
        return <></>;
    }

    if (!userStore.isLoggedIn)
        return <Navigate to={route.login} state={{from: location}}/>

    return (
        <>
            <Header/>
            {sidebar(userStore.getRole)}
            <Grid className={`container ${sideBarState}`}>
                <Outlet/>
            </Grid>
        </>
    )
}

export default observer(RequireAuth);
