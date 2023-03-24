import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Instructor.scss"
import InstructorList from "./InstructorList";
import {useStore} from "../../app/stores/store";
import {useEffect} from "react";
import { AppBar, Card, CardContent, Grid, IconButton, Tab, Tabs, TextField } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import { TabContext } from "@mui/lab";
import { SearchOutlined } from "@mui/icons-material";
import LoadingCircular from "../../app/layout/LoadingCircular";

function Instructor() {
    const {periodStore: {loadLists, periods, periodsList, setInstructorStatus, loading}} = useStore();
    useEffect(() => {
        if (periods.size <= 0) {
            setInstructorStatus();
            loadLists();
        }
    }, [loadLists, periods.size, setInstructorStatus]);
    return (
        <Box className={`instructor`}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Quản Lý Đăng ký Giảng viên hướng dẫn</Typography>
                    {loading ?
                    <>
                        <Card sx={{background: '#F7F9FB', borderRadius: '16px', boxShadow: 'none'}} className="account_table_list">
                            <Skeleton animation="wave" sx={{marginTop: '24px', marginLeft: '16px'}} height={35} width="20%" />
                            <Box className="account_list">
                                <Grid className="container_account_list" container>
                                    <Grid sx={{marginTop: '15px'}} item xs>
                                        <CardContent>
                                            <Skeleton animation="wave" width="20%" height={28} />
                                            <Skeleton animation="wave" width="10%" height={28} />
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box className="account_table_list" sx={{marginBottom: '30px'}}>
                                <Box className="detail_account">
                                    <Box className="select_user">
                                        <AppBar sx={{background: '#fffefe', boxShadow: 'none'}} position="static" color="default">
                                            <Tabs className="tab_account"
                                                indicatorColor="primary"
                                                textColor="inherit"
                                                variant="fullWidth"
                                                aria-label="action tabs example"
                                            >
                                                <Tab className="tab_account" label="Đã Đăng Ký" value={'0'}/>
                                                <Tab className="tab_account" label="Chưa đăng Ký" value={'1'}/>
                                            </Tabs>
                                        </AppBar>
                                    </Box>
                                    <TextField
                                    className="search_account"
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    placeholder="Tìm kiếm..."
                                    InputProps={{
                                        startAdornment: (
                                            <IconButton>
                                                <SearchOutlined/>
                                            </IconButton>
                                        ),
                                    }}/>
                                </Box>
                            </Box>
                        </Card>
                        <Card sx={{background: '#F7F9FB', borderRadius: '16px', boxShadow: 'none'}} className="account_table_list">
                            <Skeleton animation="wave" sx={{marginTop: '24px', marginLeft: '16px'}} height={35} width="20%" />
                            <Box className="account_list">
                                <Grid className="container_account_list" container>
                                    <Grid sx={{marginTop: '15px'}} item xs>
                                        <CardContent>
                                            <Skeleton animation="wave" width="20%" height={28} />
                                            <Skeleton animation="wave" width="10%" height={28} />
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box className="account_table_list" sx={{marginBottom: '30px'}}>
                                <Box className="detail_account">
                                    <Box className="select_user">
                                        <AppBar sx={{background: '#fffefe', boxShadow: 'none'}} position="static" color="default">
                                            <Tabs className="tab_account"
                                                indicatorColor="primary"
                                                textColor="inherit"
                                                variant="fullWidth"
                                                aria-label="action tabs example"
                                            >
                                                <Tab className="tab_account" label="Đã Đăng Ký" value={'0'}/>
                                                <Tab className="tab_account" label="Chưa đăng Ký" value={'1'}/>
                                            </Tabs>
                                        </AppBar>
                                    </Box>
                                    <TextField
                                    className="search_account"
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    placeholder="Tìm kiếm..."
                                    InputProps={{
                                        startAdornment: (
                                            <IconButton>
                                                <SearchOutlined/>
                                            </IconButton>
                                        ),
                                    }}/>
                                </Box>
                            </Box>
                        </Card>
                    </>
                    :
                    <>
                        {periodsList.map(period =>
                            <InstructorList period={period} key={period.id}/>
                        )}
                    </>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default observer(Instructor);
