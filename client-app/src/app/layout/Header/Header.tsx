import {observer} from "mobx-react-lite";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import GppBadIcon from '@mui/icons-material/GppBad';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Badge, {badgeClasses} from "@mui/material/Badge";

import MenuItem from "../Menu/MenuItem";
import "./Header.scss"
import {route} from "../../router/Routers";

function Header() {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" id="app_bar" sx={{position: 'fixed'}}>
            <Container className="container">
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    </Box>
                    <Box className="user">
                        <Box className="icon" sx={{color: 'action.active'}}>
                            <Badge color="error" variant="dot" sx={{
                                [`& .${badgeClasses.dot}`]: {
                                    width: 6,
                                    height: 6,
                                    top: 5,
                                    right: 6,
                                    minWidth: "unset",
                                    borderRadius: "50%"
                                }
                            }}>
                                <ChatBubbleOutlineIcon/>
                                <NotificationsNoneIcon/>
                            </Badge>
                        </Box>
                        <Box className="tlt">
                            <Typography variant="h5">Phạm Thị Tuyết Anh</Typography>
                            <Box component="span">xxxxxxx@e.tlu.edu.vn</Box>
                        </Box>
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="avatar" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem title="Thông tin tài khoản" to={route.login} icon={<PersonIcon/>}/>
                            <MenuItem title="Đổi mật khẩu" to={route.login} icon={<GppBadIcon/>}/>
                            <MenuItem title="Đóng phiên làm việc" to={route.login} icon={<LogoutIcon/>}/>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default observer(Header);