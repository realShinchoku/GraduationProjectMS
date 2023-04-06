import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {FileMoreLine} from '../../assets';
import {useStore} from '../../app/stores/store';
import ModalNotification from './ModalNotification';
import "./Notification.scss";

export default function Notification() {

    const {modalStore} = useStore();

    return (
        <Box className="notification">
            <Typography variant='h2'>Thông báo</Typography>
            <Box className="inner">
                <Box className="txt">
                    <Typography variant='h4'>Xác nhận hoàn thành đăng kí giáo viên</Typography>
                    <Typography variant='body1'>
                        Ngày
                        <Box component="span">3/28/2023</Box>
                    </Typography>
                </Box>
                <Box className="thumb"
                     onClick={() => {
                         modalStore.openModal(<ModalNotification/>)
                     }}>
                    <Box component="img" src={FileMoreLine} alt=""/>
                </Box>
            </Box>
        </Box>
    );
}