import { AppBar, Box, IconButton, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { SearchOutlined } from "@mui/icons-material";
import React from "react";
import SwipeableViews from 'react-swipeable-views';
import AccountManagementTable from "./AccountManagementTable";
import "./AccountManagement.scss"

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
  function a11yProps(index: any) {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`,
    };
  }

  export default function AccountTableRow() {
    const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
;
return (
<Box>
    <Box className="account_table_list">
        <Box>
        <Box className="detail_account">
            <Box className="select_user">
                <AppBar sx={{background:'#fffefe',boxShadow:'none'}} position="static" color="default">
                    <Tabs className="tab_account"
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="action tabs example"
                    >
                    <Tab className="tab_account" label="Sinh Viên" {...a11yProps(0)} />
                    <Tab className="tab_account" label="Giảng Viên" {...a11yProps(1)} />
                    <Tab className="tab_account" label="Bộ Môn" {...a11yProps(2)} />
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
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                >
                <TabPanel value={value} index={0} dir={theme.direction}>
                <AccountManagementTable/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                <AccountManagementTable/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                <AccountManagementTable/>
                </TabPanel>
            </SwipeableViews>
        </Box>
    </Box>
</Box>
);
}