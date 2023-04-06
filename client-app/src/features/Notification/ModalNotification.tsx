import {observer} from "mobx-react-lite";
import {Box, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";

import {useStore} from "../../app/stores/store";
import TxtNotification from "./TxtNotification";

function ModalNotification() {

    const { modalStore: {closeModal}} = useStore();

    return (
        <Box className="modal_notification">
            <Box className="inner">
                <Box className="close" onClick={closeModal}>×</Box>
                <Box className="tlt">
                    <Typography variant="h2">Xác nhận hoàn thành đăng ký giáo viên</Typography>
                    <TxtNotification tlt="Ngày:" txt=" 3/28/2023"/>
                </Box>
                <Box className="txt">
                    <TxtNotification tlt="Mã sinh viên:" txt=" 123456678"/>
                    <TxtNotification tlt="Tên sinh viên:" txt=" Nguyễn Văn An"/>
                    <TxtNotification tlt="Lớp:" txt=" 61THNB"/>
                    <TxtNotification tlt="Khoá:" txt=" 61"/>
                    <TxtNotification tlt="Khoa:" txt=" Công nghệ thông tin"/>
                    <Typography sx={{mt: 2}} variant='body1'>Thông tin giáo viên hướng dẫn</Typography>
                    <TxtNotification tlt="Tên giáo viên hưỡng dẫn:" txt=" Nguyễn Văn B"/>
                    <TxtNotification tlt="Email:" txt=" bnv@e.tlu.edu.vn"/>
                    <TxtNotification tlt="Học vị:" txt=" Phó giáo sư tiên sĩ"/>
                    <TxtNotification tlt="Bộ môn:" txt=" Trí tuệ nhân tạo"/>
                </Box>
                <LoadingButton
                    color="primary" 
                    variant="contained"
                    onClick={closeModal}
                >
                    Xác nhận
                </LoadingButton>
            </Box>
        </Box>
    );
}

export default observer(ModalNotification);

