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
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Badge, {badgeClasses} from "@mui/material/Badge";
import {useStore} from "../../stores/store";
import {ListItemIcon, MenuItem} from "@mui/material";
import {AccountCircle, Logout, Settings} from "@mui/icons-material";
import "./Header.scss";

function Header() {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const {userStore: {logout}} = useStore();

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
                            <Typography variant="h5">Ph???m Th??? Tuy???t Anh</Typography>
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
                            <MenuItem onClick={() => console.log("profile")}>
                                <ListItemIcon>
                                    <AccountCircle fontSize="small"/>
                                </ListItemIcon>
                                h??ng tin t??i kho???n
                            </MenuItem>
                            <MenuItem onClick={() => console.log("doi mk")}>
                                <ListItemIcon>
                                    <Settings fontSize="small"/>
                                </ListItemIcon>
                                ?????i m???t kh???u
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <Logout fontSize="small"/>
                                </ListItemIcon>
                                ????ng xu???t
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default observer(Header);