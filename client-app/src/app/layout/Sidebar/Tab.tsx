import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import "./Sidebar.scss"

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`, 'aria-controls': `vertical-tabpanel-${index}`,
    };
}


export default function VerticalTabs() {

    return (
        <Box
            className="tab"
        >
            <Tabs
                orientation="vertical"
            >
                <Tab className="tab_" label="Danh Sách" {...a11yProps(0)} icon={<FiberManualRecordIcon/>}
                     iconPosition="start"/>
                <Tab className="tab_" label="Đã gửi yêu cầu" {...a11yProps(1)} icon={<FiberManualRecordIcon/>}
                     iconPosition="start"/>
                <Tab className="tab_" label="Thông báo quan trọng" {...a11yProps(2)} icon={<FiberManualRecordIcon/>}
                     iconPosition="start"/>
            </Tabs>
        </Box>
    );
}