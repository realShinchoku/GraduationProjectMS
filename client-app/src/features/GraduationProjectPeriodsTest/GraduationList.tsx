import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Graduation.scss"
import {useStore} from "../../app/stores/store";
import {useEffect} from "react";
import LoadingCircular from "../../app/layout/LoadingCircular";
import GraduationProjectPeriodsListFilter from "./GraduationFilter";
import GraduationProjectPeriodsTable from "./GraduationTable";


function GraduationProjectPeriodsList() {

    const {commonStore: {isActive}, lecturerStore: {lecturers, loadLecturers, loading}} = useStore();
    useEffect(() => {
        if (lecturers.size <= 1) loadLecturers();
    }, [loadLecturers, lecturers.size]);
    return (
        <Box className={`graduation ${isActive}`}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Đợt Đồ Án</Typography>
                    <GraduationProjectPeriodsListFilter/>
                    {loading ?
                        <LoadingCircular />
                        : <GraduationProjectPeriodsTable/>}
                </Box>
            </Box>
        </Box>
    )
}

export default observer(GraduationProjectPeriodsList);