import {observer} from "mobx-react-lite";
import "./Mission.scss"
import {Box, List, ListItem, Typography} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function Mission() {
    return (
        <Box className="mission">
            <Typography variant="h2">Nhiệm Vụ</Typography>
            <List>
                <ListItem>
                    <Box className="inner">
                        <CalendarMonthIcon/>
                        <Typography variant='h4'>18 Th2, 23</Typography>
                    </Box>
                    <Typography variant='body1'>Thời Gian Đăng Ký Đề Tài</Typography>
                </ListItem>
                <ListItem>
                    <Box className="inner">
                        <CalendarMonthIcon/>
                        <Typography variant='h4'>18 Th2, 23</Typography>
                    </Box>
                    <Typography variant='body1'>Thời Gian Đăng Ký Giáo Viên</Typography>
                </ListItem>
                <ListItem>
                    <Box className="inner">
                        <CalendarMonthIcon/>
                        <Typography variant='h4'>18 Th2, 23</Typography>
                    </Box>
                    <Typography variant='body1'>Thời Gian Trao Đổi</Typography>
                </ListItem>
                <ListItem>
                    <Box className="inner">
                        <CalendarMonthIcon/>
                        <Typography variant='h4'>18 Th2, 23</Typography>
                    </Box>
                    <Typography variant='body1'>Thời Gian Báo Cáo</Typography>
                </ListItem>
                <ListItem>
                    <Box className="inner">
                        <CalendarMonthIcon/>
                        <Typography variant='h4'>18 Th2, 23</Typography>
                    </Box>
                    <Typography variant='body1'>Thời Gian Bảo Vệ</Typography>
                </ListItem>
            </List>
        </Box>
    )

}

export default observer(Mission);

