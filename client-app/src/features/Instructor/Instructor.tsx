import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Instructor.scss"
import InstructorList from "./InstructorList";

function Instructor() {

    return (
        <Box className={`instructor`}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Quản Lý Đăng Ký Giảng Viên Hướng Dẫn</Typography>
                    <InstructorList/>
                </Box>
            </Box>
        </Box>
    )
}

export default observer(Instructor);
