import {observer} from "mobx-react-lite";
import {useLocation} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {Avatar, Box, Typography} from "@mui/material";
import WidgetsIcon from '@mui/icons-material/Widgets';
import SmsIcon from '@mui/icons-material/Sms';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BallotIcon from '@mui/icons-material/Ballot';
import WalletIcon from '@mui/icons-material/Wallet';
import Button from '@mui/material/Button';

import {route} from "../../router/Routers";
import {LampOn, LogoSP} from "../../../assets";
import VerticalTabs from "./Tab";
import {useStore} from "../../stores/store";
import SidebarItem from "./SidebarItem/SidebarItem";
import "./Sidebar.scss";

function Sidebar() {

    const location = useLocation();

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
                <SidebarItem title="Trang chủ" to={route.home} icon={<WidgetsIcon/>}/>
                <SidebarItem title="Giảng viên" to={route.lecturer} icon={<SmsIcon/>}/>
                <SidebarItem title="Nhiệm vụ" to={route.lecturer} icon={<BallotIcon/>}/>
                <SidebarItem title="Cá nhân" to={route.lecturer} icon={<PeopleAltIcon/>}/>
                <SidebarItem title="Quản lý" to={route.lecturer} icon={<WalletIcon/>}/>
            </Box>
            <Typography className="tlt">GIẢNG VIÊN</Typography>
            {(location.pathname === '/lecturer') && (
                <VerticalTabs/>
            )}
            <Box className="confirm">
                <Box className="thumb"/>
                <Box className="inner">
                    <Typography variant="h3">Thông báo xác nhận</Typography>
                    <Typography variant="body1">Giảng viên Nguyễn Thị Phương Thảo đã chấp nhận yêu cầu hướng dẫn của
                        bạn.</Typography>
                    <Button variant="contained">OK</Button>
                    <Button variant="outlined">Đóng</Button>
                </Box>
            </Box>
        </Grid>
    )
}

export default observer(Sidebar);