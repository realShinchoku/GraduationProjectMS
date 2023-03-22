import {Navigate, Outlet} from "react-router-dom";
import {useStore} from "../stores/store";
import {Role} from "../models/user";
import {route} from "./Routers";
import {observer} from "mobx-react-lite";

function IsLecturer() {
    const {userStore: {getRole}} = useStore();

    if (getRole !== Role.Lecturer)
        return <Navigate to={route.home}/>;

    return (
        <Outlet/>
    )
}

export default observer(IsLecturer);