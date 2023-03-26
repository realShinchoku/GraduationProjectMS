import {observer} from "mobx-react-lite";
import {Form} from "react-router-dom";
import * as Yup from 'yup';
import {
    Box, 
    FormControlLabel, 
    Radio, 
    RadioGroup, 
    TextField, 
    Typography
} 
from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Field, Formik} from "formik";

import { useStore } from "../../app/stores/store";
import "./StudentTopic.scss"

const validationSchema = Yup.object().shape({
    topicName: Yup.string()
        .required("Vui lòng nhập tên đề tài"),
    describe: Yup.string()
        .required("Vui lòng nhập mô tả"),
});

function RegisterTopic() {

    const {topicStore: {createTopic}, modalStore: {closeModal}} = useStore();

    return (
        <Box className="register_topic">
            <Box className="inner"> 
                <Box className="close" onClick={closeModal}>×</Box>
                <Typography variant="h2">THÔNG TIN ĐỀ TÀI</Typography>
                <Formik
                    initialValues={{
                        topicName: '',
                        describe: '',
                        error: {topicName: '', describe: ''}
                    }}
                    onSubmit={(values, {setErrors}) => createTopic({
                        topicName: values.topicName,
                        describe: values.describe
                    }).catch((err: any) => {
                        setErrors({error: err});
                    })}
                    validationSchema={validationSchema}
                >
                    {({handleSubmit, isSubmitting, errors, handleChange, isValid, dirty}) => (
                        <Form onSubmit={handleSubmit}>
                            <Field
                                name="topicName"
                                label="Tên đề tài"
                                fullWidth
                                as={TextField}
                                onChange={handleChange}
                                sx={{marginBottom: 2}}
                                error={(dirty && Boolean(errors.topicName)) || Boolean(errors.error?.topicName)}
                                helperText={(dirty && errors.topicName) || errors.error?.topicName}
                            />
                            <Field
                                name="describe"
                                label="Mô tả"
                                fullWidth
                                as={TextField}
                                onChange={handleChange}
                                sx={{marginBottom: 2}}
                                error={(dirty && Boolean(errors.describe)) || Boolean(errors.error?.describe)}
                                helperText={(dirty && errors.describe) || errors.error?.describe}
                            />
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="web"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="web" control={<Radio />} label="Web" />
                                <FormControlLabel value="android" control={<Radio />} label="Android" />
                                <FormControlLabel value="ai" control={<Radio />} label="AI" />
                                <FormControlLabel value="study" control={<Radio />} label="Nghiên cứu" />
                            </RadioGroup>

                            <LoadingButton
                                color="primary" variant="contained"
                                onClick={closeModal}
                            >
                                Thoát
                            </LoadingButton>
                            <LoadingButton
                                color="primary" variant="contained"
                                loading={isSubmitting}
                                disabled={!isValid || !dirty || isSubmitting}
                                type="submit"
                            >
                                Xác nhận
                            </LoadingButton>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}

export default observer(RegisterTopic);

