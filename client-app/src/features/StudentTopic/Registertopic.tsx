import {observer} from "mobx-react-lite";
import * as Yup from 'yup';
import {Box, FormControlLabel, FormHelperText, Radio, Typography} from "@mui/material";
import {RadioGroup, TextField} from "formik-mui";
import {LoadingButton} from "@mui/lab";
import {Field, Form, Formik} from "formik";
import FormControl from '@mui/material/FormControl';
import {useStore} from "../../app/stores/store";
import "./StudentTopic.scss"
import {Topic, TopicFormValue} from "../../app/models/topic";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Vui lòng nhập tên đề tài"),
    description: Yup.string()
        .required("Vui lòng nhập mô tả"),
    type: Yup.string()
        .required("Vui lòng chọn đề tài"),
});

interface Props {
    topic?: Topic
}

function RegisterTopic({topic}: Props) {

    const {topicStore: {create, edit}, modalStore: {closeModal}} = useStore();
    const topicFormValue = new TopicFormValue(topic);

    function handleSubmit(values: any, setErrors: any) {
        if (values.id) {
            edit(values.id, values.name, values.type, values.description).catch((err: any) => {
                setErrors({error: err});
            })
        } else {
            create(values.name, values.type, values.description).catch((err: any) => {
                setErrors({error: err});
            })
        }
    }

    return (
        <Box className="register_topic">
            <Box className="inner">
                <Box className="close" onClick={closeModal}>×</Box>
                <Typography variant="h2">THÔNG TIN ĐỀ TÀI</Typography>
                <Formik
                    initialValues={{...topicFormValue, error: null}}
                    onSubmit={(values, {setErrors}) => handleSubmit(values, setErrors)}
                    validationSchema={validationSchema}
                >
                    {({isSubmitting, errors, isValid, dirty, touched}) => (
                        <Form>
                            <Field
                                component={TextField}
                                fullWidth
                                name="name"
                                label="Tên đề tài"
                                sx={{marginBottom: 2}}
                                error={touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                            />
                            <Field
                                component={TextField}
                                fullWidth
                                name="description"
                                label="Mô tả"
                                sx={{marginBottom: 2}}
                                error={touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                multiline
                                rows={4}
                            />
                            <FormControl sx={{display: "unset"}} error={touched.type &&  !!errors.type} variant="standard">
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
                                <FormHelperText>{touched.type &&  errors.type}</FormHelperText>
                            </FormControl>

                            <LoadingButton
                                color="primary"
                                variant="contained"
                                onClick={closeModal}
                            >
                                Thoát
                            </LoadingButton>
                            <LoadingButton
                                color="primary"
                                variant="contained"
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

