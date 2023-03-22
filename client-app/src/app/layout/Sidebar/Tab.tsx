import Box from '@mui/material/Box';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import {route} from "../../router/Routers";
import "./Sidebar.scss"
import LinkSidebar from './LinkSidebar';

export default function VerticalTabs() {

    return (
        <Box className="tab">
            <LinkSidebar title="Danh sách" to={route.lecturer} icon={<FiberManualRecordIcon className='green'/>}/>
            <LinkSidebar title="Đã gửi yêu cầu" to={route.empty} icon={<FiberManualRecordIcon className='red'/>}/>
            <LinkSidebar title="Thông báo quan trọng" to={route.empty} icon={<FiberManualRecordIcon className='blu'/>}/>
        </Box>
    );
}