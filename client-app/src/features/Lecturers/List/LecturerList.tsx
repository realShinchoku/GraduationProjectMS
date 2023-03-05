import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./lecturer.scss"
import {useStore} from "../../../app/stores/store";
import LecturerTable from "./LecturerTable";
import LecturerListFilter from "./LecturerListFilter";
import {useEffect} from "react";


function LecturerList() {

    const {commonStore: {isActive}, lecturerStore: {lecturers, loadLecturers}} = useStore();
    useEffect(() => {
        if (lecturers.size <= 0) loadLecturers();
    }, [loadLecturers, lecturers.size]);
    return (
        <Box className={`lecturer ${isActive}`}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Giảng Viên</Typography>
                    <LecturerListFilter/>
                    <LecturerTable/>
                </Box>
            </Box>
        </Box>
    )
}

export default observer(LecturerList);