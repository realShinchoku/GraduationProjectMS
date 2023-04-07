import {Link, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {ArrowLeft} from '../../assets';
import "./Document.scss"
import UploadFile from './UploadFile';

export default function DocumentReport() {

    return (
        <Box className="document_outline">
            <Link href="/document">
                <Box className="thumb">
                    <Box component="img" src={ArrowLeft} alt=""/>
                </Box>
            </Link>
            <Box className="inner">
                <Typography variant='h2'>Nộp báo cáo</Typography>
                <UploadFile/>
            </Box>
        </Box>
    );
}