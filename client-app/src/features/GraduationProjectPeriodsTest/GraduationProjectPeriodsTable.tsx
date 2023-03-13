import { Box, Button, Card, CardContent, Collapse, Divider, Grid, Typography} from "@mui/material";
import React from "react";
import GraduationProjectPeriodsTableDetail from "./GraduationProjectPeriodsTableDetail";

type Props = {
    value: boolean,
};

export default function AccountTableList() {
   
    const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
            <Card sx={{background:'#F7F9FB',borderRadius:'16px'}} className="account_table_list">
            <Typography variant="h6" className="name_table">Đồ Án Khoá K61 Đợt 1</Typography>
            <Box className="account_list">
                <Grid container>
                    <Grid sx={{marginTop:'15px'}} item xs>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" >
                                Số đề tài
                            </Typography>
                            <Typography className="text_bold" gutterBottom component="div">
                                9,123
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Divider sx={{height:'40%',margin:'auto',}} orientation="vertical" flexItem></Divider>
                    <Grid sx={{marginTop:'15px'}} item xs>
                        <CardContent className="center_text">
                        <Typography variant="body2" color="text.secondary" >
                                Ngày bắt đầu 
                            </Typography>
                            <Typography className="text_bold" gutterBottom component="div">
                                12,948
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Divider sx={{height:'40%',margin:'auto',}}  orientation="vertical" flexItem></Divider>
                    <Grid sx={{marginTop:'15px'}} item xs>
                        <CardContent className="center_text">
                        <Typography variant="body2" color="text.secondary" >
                                Ngày kết thúc 
                            </Typography>
                            <Typography className="text_bold" gutterBottom component="div">
                                2022
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Divider sx={{height:'40%',margin:'auto',}}  orientation="vertical" flexItem></Divider>
                    <Grid sx={{marginTop:'15px'}} item xs>
                        <CardContent className="center_text">
                        <Typography variant="body2" color="text.secondary" >
                                Khoa 
                            </Typography>
                            <Typography className="text_bold" gutterBottom component="div">
                                CNTT
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Divider sx={{height:'40%',margin:'auto',}}  orientation="vertical" flexItem></Divider>
                </Grid>
                <Box className ="button_account_management">
                    <Button  
                        color="inherit" variant="outlined" className="button_" 
                        onClick={() => setOpen(!open)}>Chi Tiết</Button>
                </Box>
            </Box>
            <Box>
            
            </Box>
        </Card>
    
    <GraduationProjectPeriodsTableDetail value={open}/>
</React.Fragment>
  );
}