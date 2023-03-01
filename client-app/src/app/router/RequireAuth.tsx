import {useStore} from "../stores/store";
import {Outlet, useLocation} from "react-router-dom";
import Sidebar from "../layout/Sidebar/Sidebar";
import Header from "../layout/Header/Header";
import {useState} from "react";
import {Grid} from "@mui/material";
import "../../assets/css/config/_reset.scss"
import {observer} from "mobx-react-lite";

function RequireAuth() {
    const {userStore: {isLoggedIn}} = useStore();
    const location = useLocation();
    const [value, setValue] = useState(0);

    // if (!isLoggedIn)
    //     return <Navigate to={route.login} state={{from: location}}/>
    const {
        commonStore: {isActive}
    } = useStore();

    return (
        <>
            <Header/>
            <Sidebar setValue={setValue} value={value}/>
            <Grid className={`container ${isActive}`}>
                <Outlet context={value}/>
            </Grid>
        </>
    )
}

export default observer(RequireAuth);