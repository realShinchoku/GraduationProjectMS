import {AppBar, Box, IconButton, Tab, Tabs, TextField, Typography} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import {SearchOutlined} from "@mui/icons-material";
import React from "react";

import StudentManagementTableRegistered from "./StudentManagementTableRegistered";
import StudentManagementTableUnregister from "./StudentManagementTableUnregister";
import {TabContext, TabPanel} from "@mui/lab";

interface Props {
    periodId : string
}

export default function StudentTableRow({periodId} : Props) {
    const theme = useTheme();
    const [value, setValue] = React.useState('0');

    const handleChange = (event: unknown, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box className="account_table_list">
                <TabContext value={value}>
                    <Box className="detail_account">
                        <Box className="select_user">
                            <AppBar sx={{background: '#fffefe', boxShadow: 'none'}} position="static" color="default">
                                <Tabs className="tab_account"
                                      value={value}
                                      onChange={handleChange}
                                      indicatorColor="primary"
                                      textColor="inherit"
                                      variant="fullWidth"
                                      aria-label="action tabs example"
                                >
                                    <Tab className="tab_account" label="Đã Đăng Ký" value={'0'} />
                                    <Tab className="tab_account" label="Chưa đăng Ký" value={'1'} />
                                </Tabs>
                            </AppBar>
                        </Box>
                        <TextField
                            className="search_account"
                            fullWidth
                            size="small"
                            id="standard-bare"
                            variant="outlined"
                            placeholder="Tìm kiếm..."
                            InputProps={{
                                startAdornment: (
                                    <IconButton>
                                        <SearchOutlined/>
                                    </IconButton>
                                ),
                            }}
                        />
                    </Box>
                    <TabPanel value={'0'} dir={theme.direction}>
                        <StudentManagementTableRegistered periodId={periodId}/>
                    </TabPanel>
                    <TabPanel value={'1'} dir={theme.direction}>
                        <StudentManagementTableUnregister/>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
}