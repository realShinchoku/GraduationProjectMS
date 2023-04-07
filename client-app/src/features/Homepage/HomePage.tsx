import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItemLink from "./ListItemLink";
import {Bag, Book, Cap, File} from "../../assets";
import "./HomePage.scss"
import {route} from "../../app/router/Routers";
import {useStore} from "../../app/stores/store";
import {Role} from "../../app/models/user";

function HomePage() {
    const {userStore:{getRole}}= useStore();
    
    // if(getRole !== Role.Student)
    //     return <></>;
    //
    return (
        <Box className={'homepage'}>
            <Box className="inner">
                <Typography variant="h2">Trang Chủ</Typography>
                <Box className="wrapper">
                    <Box className="wrapper_right">
                        <ListItemLink name="lecturer" to={route.lecturer} title="Giảng Viên" image={Cap}/>
                        <Box className="wrapper_child">
                            <ListItemLink name="mission" to={route.lecturer} title="Nhiệm Vụ" image={Book}/>
                            <ListItemLink name="individual" to={route.lecturer} title="Cá Nhân" image={Bag}/>
                        </Box>
                    </Box>
                    <ListItemLink name="manage" to={route.lecturer} title="Quản Lý" image={File}/>
                </Box>
            </Box>
        </Box>
    )
}

export default observer(HomePage);