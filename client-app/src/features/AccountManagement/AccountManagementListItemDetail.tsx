import {AppBar, Box, IconButton, Tab, Tabs, TextField} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import {SearchOutlined} from "@mui/icons-material";
import React from "react";
import {TabContext, TabPanel} from "@mui/lab";
import AccountManagementListItemStudentTable from "./AccountManagementListItemStudentTable";
import AccountManagementListItemLecturerTable from "./AccountManagementListItemLecturerTable";
import AccountManagementListItemDepartmentSubjectTable from "./AccountManagementListItemDepartmentSubjectTable";

function AccountManagementListItemDetail() {
    const theme = useTheme();
    const [value, setValue] = React.useState<string>('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
                                      onChange={handleChange}
                                      indicatorColor="primary"
                                      textColor="inherit"
                                      variant="fullWidth"
                                      aria-label="action tabs example"
                                >
                                    <Tab className="tab_account" label="Sinh Viên" value={'0'}/>
                                    <Tab className="tab_account" label="Giảng Viên" value={'1'}/>
                                    <Tab className="tab_account" label="Bộ Môn" value={'2'}/>
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
                        <AccountManagementListItemStudentTable/>
                    </TabPanel>
                    <TabPanel value={'1'} dir={theme.direction}>
                        <AccountManagementListItemLecturerTable/>
                    </TabPanel>
                    <TabPanel value={'2'} dir={theme.direction}>
                        <AccountManagementListItemDepartmentSubjectTable/>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
}

export default AccountManagementListItemDetail;