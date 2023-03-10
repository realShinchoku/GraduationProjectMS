import { Box, Button, Card, CardContent, Divider, TableCell,  Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import "./StudentManagement.scss"
import React, { useState } from "react";


const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
  }));

  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`action-tabpanel-${index}`}
        aria-labelledby={`action-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Typography>
    );
  }
  

export default function StudentTableList() {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  var buttonText = show ? "Thu Gọn" : "Chi Tiết";
;
  return (
    <Card sx={{background:'#F7F9FB',borderRadius:'16px',boxShadow:'none'}} className="account_table_list">
        <Typography variant="h6" className="name_table">Đồ Án Khoá K61 Đợt 1</Typography>
          <Box className="account_list">
            <Grid className="container_account_list" container>
                <Grid sx={{marginTop:'15px'}} item xs>
                    <CardContent>
                        <Typography sx={{fontFamily:'Inter'}} variant="body2" color="text.secondary" >
                            Số Tài Khoản 
                        </Typography>
                        <Typography className="text_bold" gutterBottom component="div">
                            9,123
                        </Typography>
                    </CardContent>
                </Grid>
                <Divider sx={{height:'40%',margin:'auto',}} orientation="vertical" flexItem></Divider>
                <Grid sx={{marginTop:'15px'}} item xs>
                    <CardContent className="center_text">
                     <Typography sx={{fontFamily:'Inter'}} variant="body2" color="text.secondary" >
                            Tổng Số Sinh Viên 
                        </Typography>
                        <Typography className="text_bold" gutterBottom component="div">
                            12,948
                        </Typography>
                    </CardContent>
                </Grid>
                <Divider sx={{height:'40%',margin:'auto',}}  orientation="vertical" flexItem></Divider>
                <Grid sx={{marginTop:'15px'}} item xs>
                    <CardContent className="center_text">
                     <Typography sx={{fontFamily:'Inter'}} variant="body2" color="text.secondary" >
                            Số Giảng Viên 
                        </Typography>
                        <Typography className="text_bold" gutterBottom component="div">
                            2022
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
            <TableCell className ="button_account_management">
                <Button color="inherit" variant="outlined" className="button_" onClick={() => setShow(prev => !prev)}>{buttonText}</Button>
                <Button color="inherit" variant="outlined" className="button_" onClick={() => setOpen(prev => !prev)}>Thêm</Button>
            </TableCell>
        </Box>
    </Card>
    
  );
}