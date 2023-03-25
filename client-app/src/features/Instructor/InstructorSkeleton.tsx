import {AppBar, Card, CardContent, Grid, IconButton, Tab, Tabs, TextField} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import {SearchOutlined} from "@mui/icons-material";

export default function InstructorSkeleton() {
    return (
        <>
            <Card sx={{background: '#F7F9FB', borderRadius: '16px', boxShadow: 'none'}} className="account_table_list">
                <Skeleton animation="wave" sx={{marginTop: '24px', marginLeft: '16px'}} height={35} width="20%"/>
                <Box className="account_list">
                    <Grid className="container_account_list" container>
                        <Grid sx={{marginTop: '15px'}} item xs>
                            <CardContent>
                                <Skeleton animation="wave" width="20%" height={28}/>
                                <Skeleton animation="wave" width="10%" height={28}/>
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
                <Skeleton animation="wave" sx={{marginTop: '24px', marginLeft: '16px'}} height={35} width="20%"/>
                <Box className="account_list">
                    <Grid className="container_account_list" container>
                        <Grid sx={{marginTop: '15px'}} item xs>
                            <CardContent>
                                <Skeleton animation="wave" width="20%" height={28}/>
                                <Skeleton animation="wave" width="10%" height={28}/>
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
    )
}