import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./TopicAssignment.scss";
import TopicAssignmentTable from "./TopicAssignmentTable";
import {useEffect} from "react";
import {useStore} from "../../app/stores/store";
import {useParams} from "react-router-dom";
import {route} from "../../app/router/Routers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {IconButton} from "@mui/material";

function TopicAssignment() {
    const {studentStore: {setPeriodId}} = useStore();
    const {id} = useParams();
    useEffect(() => {
        if (id) setPeriodId(id, false, true).catch(err => console.log(err));
    }, [setPeriodId, id]);

    return (
        <Box className={`topic_assigment`}>
            <Box className="inner">
                <Box className="nav">
                    <IconButton href={route.project}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h3">Giao đề tài</Typography>
                    <TopicAssignmentTable/>
                </Box>
            </Box>
        </Box>
    )
}

export default observer(TopicAssignment);