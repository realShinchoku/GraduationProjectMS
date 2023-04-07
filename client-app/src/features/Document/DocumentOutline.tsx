import {Link, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import "./Document.scss"
import UploadFile from './UploadFile';
import {ArrowLeft} from '../../assets';

export default function DocumentOutline() {
    return (
        <Box className="document_outline">
            <Link href="/document">
                <Box className="thumb">
                    <Box component="img" src={ArrowLeft} alt=""/>
                </Box>
            </Link>
            <Box className="inner">
                <Typography variant='h2'>Nộp Đề Cương</Typography>
                <UploadFile/>
            </Box>
        </Box>
    );
}
