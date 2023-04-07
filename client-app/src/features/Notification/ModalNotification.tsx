import {observer} from "mobx-react-lite";
import {Box, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useStore} from "../../app/stores/store";
import TxtNotification from "./TxtNotification";
import {Notification} from "../../app/models/notification";
import {format} from "date-fns";

interface Props {
    notification: Notification;
}

function ModalNotification({notification}:Props) {

    const {modalStore: {closeModal}, notificationStore:{markAsRead}} = useStore();

    return (
        <Box className="modal_notification">
            <Box className="inner">
                <Box className="close" onClick={closeModal}>×</Box>
                <Box className="tlt">
                    <Typography variant="h2">{notification.name}</Typography>
                    <TxtNotification tlt="Ngày" txt={format(new Date(notification.createdDate), "M/dd/yyyy")}/>
                </Box>
                <Box className="txt">
                    <TxtNotification tlt="Mã sinh viên" txt={notification.student.studentId}/>
                    <TxtNotification tlt="Tên sinh viên" txt={notification.student.displayName}/>
                    <TxtNotification tlt="Lớp" txt={notification.student.class}/>
                    <TxtNotification tlt="Khoa" txt={notification.student.faculty}/>
                    <Typography sx={{mt: 2}} variant='body1'>{notification.infoTitle}</Typography>
                    {notification.infos.map((info, index) =>
                        <TxtNotification key={index} tlt={info.key} txt={info.value}/>
                    )}
                </Box>
                <LoadingButton
                    color="primary"
                    variant="contained"
                    onClick={() => markAsRead(notification.id)}
                >
                    Xác nhận
                </LoadingButton>
            </Box>
        </Box>
    );
}

export default observer(ModalNotification);

