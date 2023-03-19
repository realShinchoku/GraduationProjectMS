import {observer} from "mobx-react-lite";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {Avatar, Box, Typography} from "@mui/material";

import {route} from "../../router/Routers";
import {Category, LogoSP, ProfileUser} from "../../../assets";
import {useStore} from "../../stores/store";
import SidebarItem from "./SidebarItem/SidebarItem";
import "./Sidebar.scss";

function Sidebar1() {

    const {commonStore: {sideBarState, openSideBar, closeSideBar}} = useStore();

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
                <SidebarItem title="Giảng viên hướng dẫn" to={route.lecturer} icon={ProfileUser}/>
            </Box>
        </Grid>
    )
}

export default observer(Sidebar1);