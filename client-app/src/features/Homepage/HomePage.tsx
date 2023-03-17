import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItemLink from "./ListItemLink";
import {Bag, Book, Cap, File} from "../../assets";
import "./HomePage.scss"
import {route} from "../../app/router/Routers";

function HomePage() {
    return (
        <Box className={'homepage'}>
            <Box className="inner">
                <Typography variant="h2">Trang Chủ</Typography>
                <Box className="wrapper">
                    <Box className="wrapper_right">
                        <ListItemLink name="lecturer" to={route.lecturer} title="GIẢNG VIÊN" image={Cap}/>
                        <Box className="wrapper_child">
                            <ListItemLink name="mission" to={route.lecturer} title="NHIỆM VỤ" image={Book}/>
                            <ListItemLink name="individual" to={route.lecturer} title="CÁ NHÂN" image={Bag}/>
                        </Box>
                    </Box>
                    <ListItemLink name="manage" to={route.lecturer} title="QUẢN LÝ" image={File}/>
                </Box>
            </Box>
        </Box>
    )
}

export default observer(HomePage);