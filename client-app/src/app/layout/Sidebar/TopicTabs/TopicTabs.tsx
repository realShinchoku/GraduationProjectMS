import Box from '@mui/material/Box';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import LinkSidebar from '../LinkSidebar';
import { route } from '../../../router/Routers';
import "../Sidebar.scss"

export default function TopicTabs() {

    return (
        <Box className="tab">
            <LinkSidebar title="Đăng kí đề tài" to={route.empty} icon={<FiberManualRecordIcon className='green'/>}/>
        </Box>
    );
}