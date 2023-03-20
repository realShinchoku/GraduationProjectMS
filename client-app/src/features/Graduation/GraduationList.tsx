import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Graduation.scss"
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import GraduationProjectPeriodsListFilter from "./GraduationFilter";
import GraduationProjectPeriodsTable from "./GraduationTable";


function GraduationProjectPeriodsList() {

    const { lecturerStore: { lecturers, loadLecturers } } = useStore();
    useEffect(() => {
        if (lecturers.size <= 1) loadLecturers();
    }, [loadLecturers, lecturers.size]);
    return (
        <Box className={'graduation'}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Đợt Đồ Án</Typography>
                    <GraduationProjectPeriodsListFilter />
                    {<GraduationProjectPeriodsTable />}
                </Box>
            </Box>
        </Box>
    )
}


export default observer(GraduationProjectPeriodsList);