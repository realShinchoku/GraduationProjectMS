import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import "./Sidebar.scss"

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

interface VerticalTabsProps {
    setValue: (value: number) => void;
    value: number;
}

export default function VerticalTabs(props: VerticalTabsProps) {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        props.setValue(newValue);
    };

    return (
        <Box
            className="tab"
        >
            <Tabs
                orientation="vertical"
                value={props.value}
                onChange={handleChange}
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