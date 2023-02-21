import {useState} from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import PersonIcon from '@mui/icons-material/Person';
import GppBadIcon from '@mui/icons-material/GppBad';
import LogoutIcon from '@mui/icons-material/Logout';
import {Avatar, Box} from "@mui/material";
import WidgetsIcon from '@mui/icons-material/Widgets';
import SmsIcon from '@mui/icons-material/Sms';

import {route} from "../../router/Routers";
import MenuItem from "../Menu/MenuItem";
import {LogoSP} from "../../../assets";
import "./Sidebar.scss";

function Sidebar() {
    const [isActive, setActive] = useState(false);

    const handleClick = () => {
        setActive(!isActive);
    };
    let active = (isActive ? 'active' : '');
    return (
        <Grid sx={{background: '#FFFFFF'}} className={`side_bar ${active}`}>
            <Box className="side_bar_logo">
                <Avatar alt="Logo" className="Logo" src={LogoSP}/>
                <Box id="nav_toggle" onClick={handleClick}>
                    <Box>
                        <Box component="span"></Box>
                        <Box component="span"></Box>
                        <Box component="span"></Box>
                    </Box>
                </Box>
            </Box>
            <Box className="side_bar_inner">
                <MenuItem title="Trang chủ" to={route.login} icon={<WidgetsIcon/>}/>
                <MenuItem title="Giảng viên" to={route.homepage} icon={<SmsIcon/>}/>
                <MenuItem title="Nhiệm vụ" to={route.homepage} icon={<PersonIcon/>}/>
                <MenuItem title="Cá nhân" to={route.homepage} icon={<GppBadIcon/>}/>
                <MenuItem title="Quản lý" to={route.homepage} icon={<LogoutIcon/>}/>
            </Box>
        </Grid>
    )
}

export default Sidebar;