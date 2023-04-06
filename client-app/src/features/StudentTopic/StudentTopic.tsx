import {Box, Button, TextField, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";

import "./StudentTopic.scss";
import {Form} from "react-router-dom";
import {useStore} from "../../app/stores/store";
import RegisterTopic from "./Registertopic";
import {useEffect} from "react";
import LoadingCircular from "../../app/layout/LoadingCircular";

function StudentTopic() {
    const {
        modalStore,
        topicStore: {get, topic, loading},
    } = useStore();
    useEffect(() => {
        get();
    }, [get]);

    return (
        <Box className="student_topic">
            <Typography variant="h2">Quản lý đề tài</Typography>
            {loading ? (
                <LoadingCircular/>
            ) : !!topic ? (
                <Box className="inner">
                    <Box className="tlt">
                        <Typography variant="h4">Thông tin đề tài</Typography>
                        <Box className="button">
                            <Button
                                onClick={() => {
                                    modalStore.openModal(<RegisterTopic topic={topic}/>);
                                }}
                            >
                                Sửa đề tài
                            </Button>
                        </Box>
                    </Box>
                    <Form>
                        <TextField
                            className="input"
                            value={topic.name}
                            fullWidth
                            label="Tên đề tài"
                        />
                        <TextField
                            className="input"
                            value={topic.type}
                            fullWidth
                            label="Kiểu đồ án"
                        />
                        <TextField
                            className="textarea"
                            label="Mô tả"
                            multiline
                            rows={4}
                            fullWidth
                            value={topic.description}
                        />
                    </Form>
                </Box>
            ) : (
                <Box className="inner">
                    <Typography variant="h4">
                        Bạn chưa Đăng kí đề tài nào. vui lòng đăng ký!
                    </Typography>
                    <Button
                        onClick={() => {
                            modalStore.openModal(<RegisterTopic/>);
                        }}
                    >
                        Đăng kí đề tài
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default observer(StudentTopic);
