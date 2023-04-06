import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import "./Document.scss"
import {Group} from '../../assets';

export default function Document() {

    return (
        <Box className="document">
            <Typography variant='h2'>Quản lý tài liệu</Typography>
            <Box className="inner">
                <Box className="group">
                    <Box className="thumb">
                        <Box component="img" src={Group} alt=""/>
                    </Box>
                    <Typography variant='body1'>Nộp đề cương</Typography>
                </Box>
                <Box className="group">
                    <Box className="thumb">
                        <Box component="img" src={Group} alt=""/>
                    </Box>
                    <Typography variant='body1'>Nộp đề cương</Typography>
                </Box>
            </Box>
        </Box>
    );
}