import {Box, Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import "./StudentManagement.scss"
import StudentTableRow from "./StudentTableRow";

export default function StudentTableList() {

    return (
        <Card sx={{background: '#F7F9FB', borderRadius: '16px', boxShadow: 'none'}} className="account_table_list">
            <Typography variant="h6" className="name_table">Đồ Án Khoá K61 Đợt 1</Typography>
            <Box className="account_list">
                <Grid className="container_account_list" container>
                    <Grid sx={{marginTop: '15px'}} item xs>
                        <CardContent>
                            <Typography sx={{fontFamily: 'Inter'}} variant="body2" color="text.secondary">
                                Số Tài Khoản
                            </Typography>
                            <Typography className="text_bold" gutterBottom component="div">
                                9,123
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Divider sx={{height: '40%', margin: 'auto',}} orientation="vertical" flexItem></Divider>
                    <Grid sx={{marginTop: '15px'}} item xs>
                        <CardContent className="center_text">
                            <Typography sx={{fontFamily: 'Inter'}} variant="body2" color="text.secondary">
                                Tổng Số Sinh Viên
                            </Typography>
                            <Typography className="text_bold" gutterBottom component="div">
                                12,948
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Divider sx={{height: '40%', margin: 'auto',}} orientation="vertical" flexItem></Divider>
                    <Grid sx={{marginTop: '15px'}} item xs>
                        <CardContent className="center_text">
                            <Typography sx={{fontFamily: 'Inter'}} variant="body2" color="text.secondary">
                                Số Giảng Viên
                            </Typography>
                            <Typography className="text_bold" gutterBottom component="div">
                                2022
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Box>
            <StudentTableRow/>
        </Card>

    );
}