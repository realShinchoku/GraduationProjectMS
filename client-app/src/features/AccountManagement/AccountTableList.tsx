import {Box, Button, Card, CardContent, Divider, Grid, TableCell, Typography} from "@mui/material";
import "./AccountManagement.scss"
import {useState} from "react";
import AccountTableRow from "./AccountTableRow";
import AddAccountManagement from "./AddAccountManagement";
import {useStore} from "../../app/stores/store";


export default function AccountTableList() {
    const [detail, setDetail] = useState(false)
    const {modalStore} = useStore();

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
                    <Divider sx={{height: '40%', margin: 'auto',}} orientation="vertical" flexItem></Divider>
                    <Grid sx={{marginTop: '15px'}} item xs>
                        <CardContent className="center_text">
                            <Typography sx={{fontFamily: 'Inter'}} variant="body2" color="text.secondary">
                                Khoa
                            </Typography>
                            <Typography className="text_bold" gutterBottom component="div">
                                CNTT
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Divider sx={{height: '40%', margin: 'auto',}} orientation="vertical" flexItem></Divider>
                </Grid>
                <TableCell className="button_account_management">
                    <Button color="inherit" variant="outlined" className="button_"
                            onClick={() => setDetail(prev => !prev)}>{detail ? "Thu Gọn" : "Chi Tiết"}</Button>
                    <Button color="inherit" variant="outlined" className="button_"
                            onClick={() => modalStore.openModal(<AddAccountManagement/>)}>Thêm</Button>
                </TableCell>
            </Box>
            {detail && <AccountTableRow/>}
        </Card>

    );
}

