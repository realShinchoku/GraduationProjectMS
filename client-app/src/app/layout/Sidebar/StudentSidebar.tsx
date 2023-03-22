import {observer} from "mobx-react-lite";
import {useLocation} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {Avatar, Box, Typography} from "@mui/material";
import Button from '@mui/material/Button';

import {route} from "../../router/Routers";
import {Category, Folder, LogoSP, Message, ProfileUser, TaskSquare} from "../../../assets";
import VerticalTabs from "./Tab";
import {useStore} from "../../stores/store";
import SidebarItem from "./SidebarItem/SidebarItem";
import "./Sidebar.scss";
import {useEffect} from "react";

function StudentSidebar() {

    const location = useLocation();

    const {
        commonStore: {sideBarState, openSideBar, closeSideBar},
        popupNotificationStore: {createHubConnection, connectionStatus, maskAsRead, popupNotification}
    } = useStore();

    const handleClick = () => {
        sideBarState ? closeSideBar() : openSideBar();
    };

    useEffect(() => {
        if (!connectionStatus)
            createHubConnection();
    }, [createHubConnection, connectionStatus])

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
                <SidebarItem title="Trang chủ" to={route.home} icon={Category}/>
                <SidebarItem title="Giảng viên" to={route.lecturer} icon={Message}/>
                <SidebarItem title="Nhiệm vụ" to={route.empty} icon={TaskSquare}/>
                <SidebarItem title="Cá nhân" to={route.empty} icon={ProfileUser}/>
                <SidebarItem title="Quản lý" to={route.empty} icon={Folder}/>
            </Box>
            {(location.pathname === route.lecturer) && (
                <>
                    <Typography className="tlt">GIẢNG VIÊN</Typography>
                    <VerticalTabs/>
                </>
            )}
            {popupNotification && <Box className="confirm">
                <Box className="inner">
                    <Box className="thumb"/>
                    <Box className="thumb_"/>
                    <Box className="txt">
                        <Typography variant="h3">Thông báo xác nhận</Typography>
                        <Typography variant="body1">{popupNotification.message}</Typography>
                        <Button
                            style={{
                                backgroundColor: "#fff",
                                color: "#000000",
                                boxShadow: "unset"
                            }}
                            variant="contained"
                            onClick={maskAsRead}
                        >
                            OK
                        </Button>
                        <Button
                            style={{
                                backgroundColor: "#fff",
                                color: "#000000",
                                boxShadow: "unset"
                            }}
                            variant="contained"
                        >
                            Đóng
                        </Button>
                    </Box>
                </Box>
            </Box>}
        </Grid>
    )
}

export default observer(StudentSidebar);
