import { Box, Button, TextField, Typography } from "@mui/material";
import {observer} from "mobx-react-lite";

import "./StudentTopic.scss"
import { Form } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import RegisterTopic from "./Registertopic";


function StudentTopic() {
    
    const {modalStore} = useStore();
    const apiTopic = false;
    return (
        <Box className="student_topic">
            <Typography variant="h2">Quản lý đề tài</Typography>
            <Box className="inner">
                <Box className="tlt">
                    <Typography variant="h4">Thông tin đề tài</Typography>
                    <Box className="button">
                        {!apiTopic ?
                        <Button onClick={() => {
                            modalStore.openModal(<RegisterTopic/>)
                        }}>Đăng kí đề tài</Button>
                        :
                        <Button>Sửa đề tài</Button>
                        
                        }
                    </Box>
                </Box>
                <Form>
                    <TextField
                        className="input"
                        fullWidth
                        label="Tên đề tài"
                    />
                    <TextField
                        className="input"
                        fullWidth
                        label="Kiểu đồ án"
                    />
                    <TextField
                        className="textarea"
                        label="Mô tả"
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Form>
            </Box>
        </Box>
    )
}

export default observer(StudentTopic);