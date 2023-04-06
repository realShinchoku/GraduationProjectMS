import {observer} from "mobx-react-lite";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {Avatar, Box, Typography} from "@mui/material";

import {route} from "../../router/Routers";
import {Category, Folder, LogoSP, Message, Notification, TaskSquare,} from "../../../assets";
import {useStore} from "../../stores/store";
import SidebarItem from "./SidebarItem/SidebarItem";
import "./Sidebar.scss";
import {useEffect} from "react";

function LecturerSidebar() {
    const {
        commonStore: {sideBarState, openSideBar, closeSideBar},
        popupNotificationStore: {createHubConnection, isConnected}
    } = useStore();

    const handleClick = () => {
        sideBarState ? closeSideBar() : openSideBar();
    };

    useEffect(() => {
        if (!isConnected)
            createHubConnection();
    }, [createHubConnection, isConnected])

    return (
        <Grid sx={{background: '#FFFFFF'}} className={`side_bar ${sideBarState}`}>
            <Box className="side_bar_logo">
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar alt="Logo" className="Logo" src={LogoSP}/>
                    <Typography variant="body1" sx={{marginLeft: 1.33}}>TLU.PM</Typography>
                </Box>
                <Box id="nav_toggle" onClick={handleClick}>
                    <Box>
                        <Box component="span"></Box>
                        <Box component="span"></Box>
                        <Box component="span"></Box>
                        <Box component="span"></Box>
                    </Box>
                </Box>
            </Box>
            <Box className="side_bar_inner">
                <SidebarItem title="Trang Chủ" to={route.home} icon={Category}/>
                <SidebarItem title="Sinh Viên" to={route.lecturer} icon={Message}/>
                <SidebarItem title="Đề Tài" to={route.project} icon={TaskSquare}/>
                <SidebarItem title="Thông Báo" to={route.notification} icon={Notification}/>
                <SidebarItem title="Báo Cáo" to={route.outline} icon={Folder}/>
            </Box>
        </Grid>
    )
}

export default observer(LecturerSidebar);
