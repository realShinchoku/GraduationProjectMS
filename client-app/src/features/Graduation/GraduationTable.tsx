import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import GraduationProjectPeriodsGrid from "./GraduationGrid";

export default function AccountTableList() {

    const [detail, setDetail] = React.useState(false);
    return (
        <React.Fragment>
            <Card sx={{ background: '#F7F9FB', borderRadius: '16px' }} className="account_table_list">
                <Typography variant="h6" className="name_table">Đồ Án Khoá K61 Đợt 1</Typography>
                <Box className="account_list">
                    <Grid container>
                        <Grid sx={{ marginTop: '15px' }} item xs>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary" >
                                    Số đề tài
                                </Typography>
                                <Typography className="text_bold">
                                    948
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Divider sx={{ height: '40%', margin: 'auto', }} orientation="vertical" flexItem></Divider>
                        <Grid sx={{ marginTop: '15px' }} item xs>
                            <CardContent className="center_text">
                                <Typography variant="body2" color="text.secondary" >
                                    Ngày bắt đầu
                                </Typography>
                                <Typography className="text_bold">
                                    29 Th4,2022
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Divider sx={{ height: '40%', margin: 'auto', }} orientation="vertical" flexItem></Divider>
                        <Grid sx={{ marginTop: '15px' }} item xs>
                            <CardContent className="center_text">
                                <Typography variant="body2" color="text.secondary" >
                                    Ngày kết thúc
                                </Typography>
                                <Typography className="text_bold">
                                    29 Th7,2022
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Divider sx={{ height: '40%', margin: 'auto', }} orientation="vertical" flexItem></Divider>
                    </Grid>
                    {!detail ? <Box className="button_account_management">
                        <Button
                            color="inherit" variant="outlined" className="button_"
                            onClick={() => setDetail(true)}>Chi Tiết</Button>
                    </Box>
                        :
                        <Box className="button_account_management">
                            <Button
                                color="inherit" variant="outlined" className="button_"
                                onClick={() => setDetail(false)}>Ẩn</Button>
                            <Button color="inherit" variant="outlined" className="button_">Cập nhật</Button>
                        </Box>}
                </Box>
                <Box>
                </Box>
                {detail && <GraduationProjectPeriodsGrid />}
            </Card>

        </React.Fragment>
    );
}