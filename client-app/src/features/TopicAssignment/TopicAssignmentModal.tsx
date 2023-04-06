import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {FormControl, FormControlLabel, FormHelperText, Grid, Radio} from "@mui/material";
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
    const {modalStore, topicStore, snackBarStore} = useStore();
    
    return (
        <Formik
            initialValues={{
                name: "",
                describe: "",
                type: "",
                error: null,
            }}
            onSubmit={(values) => topicStore.assign(id, values.name, values.type, values.describe)}
            validationSchema={Yup.object().shape({
                name: Yup.string().required("Hãy điền tên đề tài"),
                describe: Yup.string().required("Hãy điền mô tả"),
                type: Yup.string().required("Vui lòng chọn kiểu đồ án"),

            })}
        >
            {({dirty, errors, isSubmitting, isValid, touched}) => (
                <Form
                    className="topic_assignment_modal"
                    style={{
                        width: "-webkit-fill-available",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#ffffff",
                        border: "1px solid #000000",
                        boxShadow: "24",
                        borderRadius: "10px",
                        padding: "62px",
                    }}
                >
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <Typography className="info_topic">THÔNG TIN ĐỀ TÀI</Typography>
                    </Box>
                    <Box sx={{width: "100%"}}>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{xs: 1, sm: 2, md: 3}}
                        >
                            <Typography className="label_topic">Tên đề tài</Typography>
                            <Grid item xs={12}>
                                <Field
                                    className="field_"
                                    component={TextField}
                                    name="name"
                                    fullWidth
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Typography className="label_topic_">Mô tả</Typography>
                            <Grid item xs={12}>
                                <Field
                                    className="field_"
                                    component={TextField}
                                    name="describe"
                                    fullWidth
                                    error={touched.describe && Boolean(errors.describe)}
                                    helperText={touched.describe && errors.describe}
                                    multiline
                                    rows="9"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography className="label_topic_bottom">Kiểu đồ án</Typography>
                    <FormControl sx={{width: 'inherit'}} error={touched.type && Boolean(errors.type)}>
                        <Field component={RadioGroup} name="type">
                            <Grid
                                container
                                rowSpacing={1}
                                justifyContent="center"
                                alignItems="center"
                                border={'1px solid #000000'}
                                borderRadius={'10px'}
                                xs={12}
                                margin={'auto'}
                            >
                                <Grid item xs={5} container justifyContent="center">
                                    <FormControlLabel
                                        value="web"
                                        control={<Radio disabled={isSubmitting}/>}
                                        label="Web"
                                        disabled={isSubmitting}
                                    />
                                </Grid>
                                <Grid item xs={5} container justifyContent="center">
                                    <FormControlLabel
                                        value="android"
                                        control={<Radio disabled={isSubmitting}/>}
                                        label="Android"
                                        disabled={isSubmitting}
                                    />
                                </Grid>
                                <Grid item xs={5} container justifyContent="center">
                                    <FormControlLabel
                                        value="AI"
                                        control={<Radio disabled={isSubmitting}/>}
                                        label="AI"
                                        disabled={isSubmitting}
                                    />
                                </Grid>
                                <Grid item xs={5} container justifyContent="center">
                                    <FormControlLabel
                                        value="math"
                                        control={<Radio disabled={isSubmitting}/>}
                                        label="Math"
                                        disabled={isSubmitting}
                                    />
                                </Grid>
                            </Grid>
                        </Field>
                        <FormHelperText>
                            {touched.type && errors.type}
                        </FormHelperText>
                    </FormControl>
                    <Box
                        sx={{display: "flex", justifyContent: "right", marginTop: "30px"}}
                    >
                        <Button sx={{marginRight: "20px", borderRadius: '10px', width: '149px'}} variant="contained"
                                onClick={modalStore.closeModal}>
                            Thoát
                        </Button>
                        <LoadingButton
                            sx={{width: "149px", borderRadius: '10px'}}
                            variant="contained"
                            type={"submit"}
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                        >
                            Lưu
                        </LoadingButton>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

export default observer(TopicAssignmentModal);
