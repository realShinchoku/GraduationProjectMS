import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Instructor.scss"
import InstructorList from "./InstructorList";
import {useStore} from "../../app/stores/store";
import {useEffect} from "react";

function Instructor() {
    const {periodStore: {loadLists, periods, periodsList,setInstructorStatus}} = useStore();
    useEffect(() => {
        if (periods.size <= 0) {
            setInstructorStatus();
            loadLists();
        }
    }, [loadLists, periods.size]);
    return (
        <Box className={`instructor`}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Quản Lý Đăng ký Giảng viên hướng dẫn</Typography>
                    {periodsList.map(period =>
                        <InstructorList period={period} key={period.id}/>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default observer(Instructor);
