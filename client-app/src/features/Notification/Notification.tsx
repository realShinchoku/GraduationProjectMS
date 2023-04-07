import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {FileMoreLine} from '../../assets';
import {useStore} from '../../app/stores/store';
import ModalNotification from './ModalNotification';
import "./Notification.scss";
import {useEffect} from "react";
import {format} from "date-fns";
import LoadingCircular from "../../app/layout/LoadingCircular";
import {observer} from "mobx-react-lite";

function Notification() {

    const {modalStore, notificationStore: {loading, loadList, listNotifications, notifications}} = useStore();

    useEffect(() => {
        if(notifications.size <= 0)
            loadList()
    }, [loadList, notifications.size]);


    return (
        <Box className="notification">
            <Typography variant='h2'>Thông báo</Typography>
            {loading && <LoadingCircular/>}
            {!loading && listNotifications.map(notification =>
                <Box className="inner" key={notification.id}>
                    <Box className="txt">
                        <Typography variant='h4'>{notification.name}</Typography>
                        <Typography variant='body1'>
                            Ngày
                            <Box component="span">{format(new Date(notification.createdDate), "M/dd/yyyy")}</Box>
                        </Typography>
                    </Box>
                    <Box className="thumb"
                         onClick={() => modalStore.openModal(<ModalNotification notification={notification}/>)}>
                        <Box component="img" src={FileMoreLine} alt=""/>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default observer(Notification);