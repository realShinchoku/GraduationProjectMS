import {useState} from "react";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import PersonIcon from '@mui/icons-material/Person';
import GppBadIcon from '@mui/icons-material/GppBad';
import LogoutIcon from '@mui/icons-material/Logout';
import {Avatar, Box, Typography} from "@mui/material";
import WidgetsIcon from '@mui/icons-material/Widgets';
import SmsIcon from '@mui/icons-material/Sms';

import {route} from "../../router/Routers";
import MenuItem from "../Menu/MenuItem";
import {LogoSP} from "../../../assets";
import VerticalTabs from "./Tab";
import "./Sidebar.scss";

interface SidebarProps {
    setValue: (value: number) => void;
    value: number;
}
  
function Sidebar(props: SidebarProps) {
    const [isActive, setActive] = useState(false);

    const location = useLocation();
    
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
                <MenuItem title="Trang chủ" to={route.homepage} icon={<WidgetsIcon/>} />
                <MenuItem title="Giảng viên" to={route.homepagetest} icon={<SmsIcon/>} />
                <MenuItem title="Nhiệm vụ" to={route.homepagetest} icon={<PersonIcon/>} />
                <MenuItem title="Cá nhân" to={route.homepagetest} icon={<GppBadIcon/>} />
                <MenuItem title="Quản lý" to={route.homepagetest} icon={<LogoutIcon/>} />  
            </Box>
            <Typography className="tlt">GIẢNG VIÊN</Typography>
            {(location.pathname === '/homepagetest')?(
            <Box>
                <VerticalTabs setValue={props.setValue} value={props.value}/>
            </Box>
            ):(<Box></Box>)}
        </Grid>
    )
}

export default Sidebar;