import { Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Group } from '../../assets';
import "./Document.scss"

export default function Document() {

    return (
        <Box className="document">
            <Typography variant='h2'>Quản lý tài liệu</Typography>
            <Box className="inner">
                <Link href="/document/outline">
                    <Box className="group">
                        <Box className="thumb">
                            <Box component="img" src={Group} alt=""/>
                        </Box>
                        <Typography variant='body1'>Nộp đề cương</Typography>
                    </Box>
                </Link>
                <Link href="/document/report">
                    <Box className="group">
                        <Box className="thumb">
                            <Box component="img" src={Group} alt=""/>
                        </Box>
                        <Typography variant='body1'>Nộp báo cáo</Typography>
                    </Box>
                </Link>
            </Box>
        </Box>
    );
}