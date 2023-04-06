import {Navigate, Outlet} from "react-router-dom";
import {useStore} from "../stores/store";
import {Role} from "../models/user";
import {route} from "./Routers";
import {observer} from "mobx-react-lite";

interface Props {
    roles: Role[];
}

function RequireRole({roles}:Props) {
    const {userStore: {getRole}} = useStore();

    if (!roles.includes(getRole))
        return <Navigate to={route.home}/>;

    return (
        <Outlet/>
    )
}

export default observer(RequireRole);