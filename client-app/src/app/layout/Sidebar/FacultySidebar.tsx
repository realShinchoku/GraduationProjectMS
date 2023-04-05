import {observer} from "mobx-react-lite";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {Avatar, Box, Divider, Typography} from "@mui/material";

import {route} from "../../router/Routers";
import {Category, Ellipse, LogoSP, ProfileUser, TaskSquare} from "../../../assets";
import {useStore} from "../../stores/store";
import SidebarItem from "./SidebarItem/SidebarItem";
import "./Sidebar.scss";
import {useLocation} from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LinkSidebar from "./LinkSidebar";

function FacultySidebar() {

    const {commonStore: {sideBarState, openSideBar, closeSideBar}} = useStore();
    const location = useLocation();
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
                <SidebarItem title="Đợt đồ án" to={route.period} icon={TaskSquare}/>
                <SidebarItem title="Tài khoản" to={route.accountStudent} icon={ProfileUser}/>
            </Box>
            {location.pathname.includes('/account')
                && <>
                    <Divider className="divider_side_bar"/>
                    <Box className="side_bar_inner tab">
                        <LinkSidebar title="Sinh viên" to={route.accountStudent} icon={<FiberManualRecordIcon className='blu'/>}/>
                        <LinkSidebar title="Giảng viên" to={route.accountLecturer} icon={<FiberManualRecordIcon className='red'/>}/>
                        <LinkSidebar title="Bộ môn" to={route.accountDepartmentSubject} icon={<FiberManualRecordIcon className='brown'/>}/>
                    </Box>
                </>
            }
        </Grid>
    )
}

export default observer(FacultySidebar);
