import {Box, Button, FormHelperText, Typography} from "@mui/material";
import "./Period.scss";
import Grid from "@mui/material/Unstable_Grid2";
import {useStore} from "../../app/stores/store";
import {Field, Form, Formik} from "formik";
import {v4 as uuid} from 'uuid';
import * as Yup from 'yup';
import {LoadingButton} from "@mui/lab";
import {PeriodFormValues} from "../../app/models/period";
import {useEffect, useState} from "react";
import {TextField} from "formik-mui";
import {DatePicker} from "formik-mui-x-date-pickers";
import {observer} from "mobx-react-lite";

interface Props {
    id?: string;
}

function PeriodModal({id}: Props) {

    const {modalStore, periodStore: {create, edit, get}} = useStore();
    const [periodFormValues, setPeriodFormValues] = useState<PeriodFormValues>(new PeriodFormValues());

    function handleFormSubmit(periodFormValues: PeriodFormValues, setErrors: any) {
        if (!periodFormValues.id) {
            create({...periodFormValues, id: uuid()}).then(modalStore.closeModal);
        } else {
            edit(periodFormValues).then(modalStore.closeModal);
        }
    }

    useEffect(() => {
        if (id)
            get(id).then((period) => setPeriodFormValues(new PeriodFormValues(period)));

    }, [id, setPeriodFormValues, get])

    return (
        <Box className="Modal">
            <Formik
                enableReinitialize
                initialValues={{...periodFormValues, errors: null}}
                onSubmit={(values, {setErrors}) => handleFormSubmit(values, setErrors)}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required("Vui lòng điền đủ thông tin"),
                    startDate: Yup.date()
                        .required("Vui lòng điền đủ thông tin"),
                    endDate: Yup.date()
                        .required("Vui lòng điền đủ thông tin"),
                    contactInstructorTime: Yup.date()
                        .required("Vui lòng điền đủ thông tin"),
                    registerTopicTime: Yup.date()
                        .required("Vui lòng điền đủ thông tin"),
                    syllabusSubmissionTime: Yup.date()
                        .required("Vui lòng điền đủ thông tin"),
                    syllabusReviewTime: Yup.date()
                        .required("Vui lòng điền đủ thông tin"),
                    graduationProjectTime: Yup.date()
                        .required("Vui lòng điền đủ thông tin"),
                    protectionTime: Yup.date()
                        .required("Vui lòng điền đủ thông tin"),
                })}
            >
                {({dirty, isValid, isSubmitting, errors}) => (
                    <Form className="modalContent">
                        <Grid container style={{marginBottom: "20px"}} spacing={2}>
                            <Grid xs={8}>
                                <Field
                                    component={TextField}
                                    name="name"
                                    label="Tên đồ án"
                                    sx={{border: "none", "& fieldset": {border: "none"}}}
                                    inputProps={{style: {fontSize: "1.25rem", fontWeight: "500", lineHeight: "1.6"}}}
                                    error={dirty && Boolean(errors.name)}
                                    helperText={dirty && errors.name}
                                />
                            </Grid>
                            <Grid xs={4}>
                                <LoadingButton
                                    type="submit"
                                    color="inherit"
                                    variant="outlined"
                                    className="button"
                                    disabled={!dirty || !isValid || isSubmitting}
                                    loading={isSubmitting}
                                >
                                    {id ? 'Cập nhật' : 'Tạo'}
                                </LoadingButton>
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    className="button"
                                    onClick={() => modalStore.closeModal()}
                                >
                                    Đóng
                                </Button>
                            </Grid>
                            <Grid container md={12} spacing={4}>
                                <Grid md={3} sx={dirty && Boolean(errors.name) && {backgroundColor:'red'}} >
                                    <Typography variant="h6" sx={{paddingLeft: "14px"}}>
                                        Ngày bắt đầu
                                    </Typography>
                                    <Field
                                        component={DatePicker}
                                        name="startDate"
                                        slotProps={{
                                            textField: {
                                                placeholder: '',
                                                error: dirty && Boolean(errors.name),
                                                helperText: (dirty && errors.name)
                                            }
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                    />
                                    <FormHelperText error={dirty && Boolean(errors.name)}>{dirty && errors.name}</FormHelperText>
                                </Grid>
                                <Grid md={3}>
                                    <Typography variant="h6" sx={{paddingLeft: "14px"}}>
                                        Ngày kết thúc
                                    </Typography>
                                    <Field
                                        component={DatePicker}
                                        name="endDate"
                                        slotProps={{
                                            textField: {
                                                placeholder: '',
                                                error: dirty && Boolean(errors.name),
                                                helperText: (dirty && errors.name)
                                            }
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid xs={4}>
                                <Box className="boxContent">
                                    <Typography variant="body2" sx={{paddingLeft: "14px"}}>
                                        Thời Gian Liên Hệ Giảng Viên
                                    </Typography>
                                    <Field
                                        component={DatePicker}
                                        name="contactInstructorTime"
                                        slotProps={{
                                            textField: {
                                                placeholder: '',
                                                error: dirty && Boolean(errors.name),
                                                helperText: (dirty && errors.name)
                                            }
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4}>
                                <Box className="boxContent">
                                    <Typography variant="body2" sx={{paddingLeft: "14px"}}>
                                        Thời Gian Đăng Ký Đề Tài
                                    </Typography>
                                    <Field
                                        component={DatePicker}
                                        name="registerTopicTime"
                                        slotProps={{
                                            textField: {
                                                placeholder: '',
                                                error: dirty && Boolean(errors.name),
                                                helperText: (dirty && errors.name)
                                            }
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4}>
                                <Box className="boxContent">
                                    <Typography variant="body2" sx={{paddingLeft: "14px"}}>
                                        Thời Gian Nộp Đề Cương
                                    </Typography>
                                    <Field
                                        component={DatePicker}
                                        name="syllabusSubmissionTime"
                                        slotProps={{
                                            textField: {
                                                placeholder: '',
                                                error: dirty && Boolean(errors.name),
                                                helperText: (dirty && errors.name)
                                            }
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4}>
                                <Box className="boxContent">
                                    <Typography variant="body2" sx={{paddingLeft: "14px"}}>
                                        Thời Gian Duyệt Đề cương
                                    </Typography>
                                    <Field
                                        component={DatePicker}
                                        name="syllabusReviewTime"
                                        slotProps={{
                                            textField: {
                                                placeholder: '',
                                                error: dirty && Boolean(errors.name),
                                                helperText: (dirty && errors.name)
                                            }
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4}>
                                <Box className="boxContent">
                                    <Typography variant="body2" sx={{paddingLeft: "14px"}}>
                                        Thời Gian Làm Đồ Án
                                    </Typography>
                                    <Field
                                        component={DatePicker}
                                        name="graduationProjectTime"
                                        slotProps={{
                                            textField: {
                                                placeholder: '',
                                                error: dirty && Boolean(errors.name),
                                                helperText: (dirty && errors.name)
                                            }
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4}>
                                <Box className="boxContent">
                                    <Box>
                                        <Typography variant="body2" sx={{paddingLeft: "14px"}}>
                                            Thời Gian Bảo Vệ
                                        </Typography>
                                    </Box>
                                    <Field
                                        component={DatePicker}
                                        name="protectionTime"
                                        slotProps={{
                                            textField: {
                                                placeholder: '',
                                                error: dirty && Boolean(errors.name),
                                                helperText: (dirty && errors.name)
                                            }
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default observer(PeriodModal)