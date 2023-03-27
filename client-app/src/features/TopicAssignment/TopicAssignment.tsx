import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./TopicAssignment.scss";
import TopicAssignmentTable from "./TopicAssignmentTable";

function TopicAssignment() {

    return (
        <Box className={`topic_assigment`}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Giao đề tài</Typography>
                    <TopicAssignmentTable/>
                </Box>
            </Box>
        </Box>
    )
}

export default observer(TopicAssignment);