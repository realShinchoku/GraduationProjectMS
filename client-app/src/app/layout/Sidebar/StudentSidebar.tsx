import {observer} from "mobx-react-lite";
import {useLocation} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {Avatar, Box, Typography} from "@mui/material";
import {route} from "../../router/Routers";
import {Category, LogoSP, Message, Mission, Notification, ProfileUser, TaskSquare} from "../../../assets";
import VerticalTabs from "./Tab";
import {useStore} from "../../stores/store";
import SidebarItem from "./SidebarItem/SidebarItem";
import "./Sidebar.scss";
import TopicTabs from "./TopicTabs/TopicTabs";

function StudentSidebar() {

    const location = useLocation();

    const {commonStore: {sideBarState, openSideBar, closeSideBar},} = useStore();

    const handleClick = () => {
        sideBarState ? closeSideBar() : openSideBar();
    };

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
                <SidebarItem title="Đề tài" to={route.topic} icon={TaskSquare}/>
                <SidebarItem title="Tài liệu" to={route.document} icon={ProfileUser}/>
                <SidebarItem title="Thông báo" to={route.notification} icon={Notification}/>
                <SidebarItem title="Nhiệm vụ" to={route.empty} icon={Mission}/>
            </Box>
            {(location.pathname === route.lecturer) && (
                <>
                    <Typography className="tlt">GIẢNG VIÊN</Typography>
                    <VerticalTabs/>
                </>
            )}
            {(location.pathname === route.topic) && (
                <>
                    <Typography className="tlt">ĐỀ TÀI</Typography>
                    <TopicTabs/>
                </>
            )}
        </Grid>
    )
}

export default observer(StudentSidebar);
