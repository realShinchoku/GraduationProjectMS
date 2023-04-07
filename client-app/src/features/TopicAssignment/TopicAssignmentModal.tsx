import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {FormControl, FormControlLabel, FormHelperText, Radio} from "@mui/material";
import {useStore} from "../../app/stores/store";
import {LoadingButton} from "@mui/lab";
import {observer} from "mobx-react-lite";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {RadioGroup, TextField} from "formik-mui";
import "./TopicAssignment.scss";

interface Props {
    id: string;
}


function TopicAssignmentModal({id}: Props) {
    const {modalStore, topicStore} = useStore();

    return (
        <Box className="register_topic">
            <Box className="inner">
                <Box className="close" onClick={modalStore.closeModal}>×</Box>
                <Typography sx={{textAlign:'center'}} variant="h2">THÔNG TIN ĐỀ TÀI</Typography>
                <Formik
                    initialValues={{
                        name: "",
                        description: "",
                        type: "",
                        error: null,
                    }}
                    onSubmit={(values) => topicStore.assign(id, values.name, values.type, values.description)}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required("Hãy điền tên đề tài"),
                        description: Yup.string().required("Hãy điền mô tả"),
                        type: Yup.string().required("Vui lòng chọn kiểu đồ án"),

                    })}
                >
                    {({isSubmitting, errors, isValid, dirty, touched}) => (
                        <Form>
                            <Typography variant='h5' sx={{marginBottom:'10px',fontWeight:'500'}}>Tên đề tài</Typography>
                            <Field
                                component={TextField}
                                fullWidth
                                name="name"
                                sx={{marginBottom: 2}}
                                error={touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                            />
                            <Typography variant='h5' sx={{marginBottom:'10px', marginTop:'30px',fontWeight:'500'}}>Mô tả</Typography>
                            <Field
                                component={TextField}
                                fullWidth
                                name="description"
                                sx={{marginBottom: 2}}
                                error={touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                multiline
                                rows={10}
                            />
                            <Typography variant='h5' sx={{marginBottom:'10px', marginTop:'30px',fontWeight:'500'}}>Kiểu đồ án</Typography>
                            <FormControl sx={{display: "unset"}} error={touched.type && !!errors.type} variant="standard">
                                <Field component={RadioGroup} name="type" className="radio_group">
                                    <FormControlLabel
                                        value="Web"
                                        control={<Radio disabled={isSubmitting}/>}
                                        label="Web"
                                        disabled={isSubmitting}
                                    />
                                    <FormControlLabel
                                        value="Android"
                                        control={<Radio disabled={isSubmitting}/>}
                                        label="Android"
                                        disabled={isSubmitting}
                                    />
                                    <FormControlLabel
                                        value="AI"
                                        control={<Radio disabled={isSubmitting}/>}
                                        label="AI"
                                        disabled={isSubmitting}
                                    />
                                    <FormControlLabel
                                        value="Nghiên cứu"
                                        control={<Radio disabled={isSubmitting}/>}
                                        label="Nghiên cứu"
                                        disabled={isSubmitting}
                                    />
                                </Field>
                                <FormHelperText>{touched.type && errors.type}</FormHelperText>
                            </FormControl>
                            <LoadingButton
                                color="primary"
                                variant="contained"
                                loading={isSubmitting}
                                disabled={!isValid || !dirty || isSubmitting}
                                type="submit"
                            >
                                Xác nhận
                            </LoadingButton>
                            
                            <LoadingButton
                                color="primary"
                                variant="contained"
                                onClick={modalStore.closeModal}
                            >
                                Thoát
                            </LoadingButton>

                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}

export default observer(TopicAssignmentModal);
