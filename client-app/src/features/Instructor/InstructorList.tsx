import {Box, Card, CardContent, Grid, Typography} from "@mui/material";

import StudentTableRow from "./StudentTableRow";
import {observer} from "mobx-react-lite";
import {Period} from "../../app/models/period";

interface Props {
    period: Period;
}

function InstructorList({period}: Props) {
    return (
        <Card sx={{background: '#F7F9FB', borderRadius: '16px', boxShadow: 'none'}} className="account_table_list">
            <Typography variant="h6" className="name_table">{period.name}</Typography>
            <Box className="account_list">
                <Grid className="container_account_list" container>
                    <Grid sx={{marginTop: '15px'}} item xs>
                        <CardContent>
                            <Typography sx={{fontFamily: 'Inter'}} variant="body2" color="text.secondary">
                                Tổng Số Sinh Viên
                            </Typography>
                            <Typography className="text_bold" gutterBottom component="div">
                                {period.studentsCount}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Box>
            <StudentTableRow periodId={period.id}/>
        </Card>

    );
}

export default observer(InstructorList);