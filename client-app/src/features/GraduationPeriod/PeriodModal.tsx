import {Box, Button, Typography} from "@mui/material";
import "./Period.scss";
import Grid from "@mui/material/Unstable_Grid2";
import {useStore} from "../../app/stores/store";
import {Field, Form, Formik} from "formik";
import {v4 as uuid} from "uuid";
import * as Yup from "yup";
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
    const {modalStore, periodStore: {create, edit, get}, snackBarStore} = useStore();
    const [periodFormValues, setPeriodFormValues] = useState<PeriodFormValues>(
        new PeriodFormValues()
    );

    function handleFormSubmit(
        periodFormValues: PeriodFormValues,
        setErrors: any
    ) {
        if (!id) {
            create({...periodFormValues, id: uuid()}).then(() => {
                snackBarStore.success('Tạo thành công');
            });
        } else {
            edit(periodFormValues).then(() => {
                snackBarStore.success('Cập nhật thành công');
            });
        }
    }

    useEffect(() => {
        if (id)
            get(id).then((period) => {
                setPeriodFormValues(new PeriodFormValues(period));
                console.log(period);
            });
    }, [id, setPeriodFormValues, get]);

    function addDate(date: Date, day: number) {
        date.setDate(date.getDate() + day);
        return date;
    }

    return (
        <Box className="Modal">
            <Formik
                enableReinitialize
                initialValues={{...periodFormValues, errors: null}}
                onSubmit={(values, {setErrors}) =>
                    handleFormSubmit(values, setErrors)
                }
                validationSchema={Yup.object().shape({
                    phase: Yup.number()
                        .typeError("Nhập khóa đồ án")
                        .required("Vui lòng điền đủ thông tin"),
                    course: Yup.number()
                        .typeError("Nhập đợt đồ án")
                        .required("Vui lòng điền đủ thông tin"),
                    startDate: Yup.date()
                        .typeError("Chọn ngày bắt đầu")
                        .required("Vui lòng điền đủ thông tin"),
                    endDate: Yup.date()
                        .typeError("Chọn ngày kết thúc")
                        .required("Vui lòng điền đủ thông tin"),
                    contactInstructorTime: Yup.date()
                        .typeError("Chọn ngày liên hệ giảng viên")
                        .required("Vui lòng điền đủ thông tin"),
                    registerTopicTime: Yup.date()
                        .typeError("Chọn ngày đăng ký đề tài")
                        .required("Vui lòng điền đủ thông tin"),
                    syllabusSubmissionTime: Yup.date()
                        .typeError("Chọn ngày nộp đề cương")
                        .required("Vui lòng điền đủ thông tin"),
                    syllabusReviewTime: Yup.date()
                        .typeError("Chọn ngày đuyệt đề cương")
                        .required("Vui lòng điền đủ thông tin"),
                    graduationProjectTime: Yup.date()
                        .typeError("Chọn ngày làm đồ án")
                        .required("Vui lòng điền đủ thông tin"),
                    protectionTime: Yup.date()
                        .typeError("Chọn ngày bảo vệ")
                        .required("Vui lòng điền đủ thông tin"),
                })}
            >
                {({touched, dirty, isValid, isSubmitting, errors,}) => (
                    <Form className="modalContent">
                        <Grid container spacing={2}>
                            <Grid xs={10} className="contentTop">
                                <Typography variant="h6">Đồ án Khóa K</Typography>
                                <Field
                                    component={TextField}
                                    type="number"
                                    name="course"
                                    placeholder="..."
                                    sx={{border: "none", "& fieldset": {border: "none"}}}
                                    inputProps={{
                                        style: {
                                            fontSize: "1.25rem",
                                            fontWeight: "500",
                                            lineHeight: "1.6",
                                            padding: "10px",
                                            width: "40px",
                                        },
                                    }}
                                    error={touched.course && Boolean(errors.course)}
                                    helperText={touched.course && errors.course}
                                />
                                <Typography variant="h6">Đợt</Typography>
                                <Field
                                    component={TextField}
                                    type="number"
                                    name="phase"
                                    placeholder="..."
                                    sx={{border: "none", "& fieldset": {border: "none"}}}
                                    inputProps={{
                                        style: {
                                            fontSize: "1.25rem",
                                            fontWeight: "500",
                                            lineHeight: "1.6",
                                            padding: "10px",
                                        },
                                    }}
                                    error={touched.phase && Boolean(errors.phase)}
                                    helperText={touched.phase && errors.phase}
                                />
                            </Grid>
                            <Grid xs={2} className="btn">
                                <LoadingButton
                                    type="submit"
                                    color="inherit"
                                    variant="outlined"
                                    className="button"
                                    disabled={!dirty || !isValid || isSubmitting}
                                    loading={isSubmitting}
                                >
                                    {id ? "Cập nhật" : "Tạo"}
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
                                <Grid md={3}>
                                    <Typography variant="h6" sx={{paddingLeft: "14px"}}>
                                        Ngày bắt đầu
                                    </Typography>
                                    <Field
                                        component={DatePicker}
                                        name="startDate"
                                        // minDate={new Date()}
                                        slotProps={{
                                            textField: {
                                                placeholder: "",
                                                error: touched.startDate && Boolean(errors.startDate),
                                                helperText: touched.startDate && errors.startDate,
                                            },
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                        onChange={(value: Date) => {
                                            setPeriodFormValues({
                                                ...periodFormValues,
                                                startDate: new Date(value),
                                                contactInstructorTime: new Date(value),
                                                registerTopicTime: new Date(addDate(value, 1)),
                                                syllabusSubmissionTime: new Date(addDate(value, 4)),
                                                syllabusReviewTime: new Date(addDate(value, 15)),
                                                graduationProjectTime: new Date(addDate(value, 22)),
                                                protectionTime: new Date(addDate(value, 30)),
                                                endDate: new Date(addDate(value, 37)),
                                            });
                                        }}
                                    />
                                </Grid>
                                <Grid md={3}>
                                    <Typography variant="h6" sx={{paddingLeft: "14px"}}>
                                        Ngày kết thúc
                                    </Typography>
                                    <Field
                                        component={DatePicker}
                                        name="endDate"
                                        minDate={new Date()}
                                        slotProps={{
                                            textField: {
                                                placeholder: "",
                                                error: touched.endDate && Boolean(errors.endDate),
                                                helperText: touched.endDate && errors.endDate,
                                            },
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                        disabled
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
                                        minDate={new Date()}
                                        slotProps={{
                                            textField: {
                                                placeholder: "",
                                                error: touched.contactInstructorTime && Boolean(errors.contactInstructorTime),
                                                helperText: touched.contactInstructorTime && errors.contactInstructorTime,
                                            },
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                        disabled
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
                                        minDate={new Date()}
                                        slotProps={{
                                            textField: {
                                                placeholder: "",
                                                error: touched.registerTopicTime && Boolean(errors.registerTopicTime),
                                                helperText: touched.registerTopicTime && errors.registerTopicTime,
                                            },
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                        disabled
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
                                        minDate={new Date()}
                                        slotProps={{
                                            textField: {
                                                placeholder: "",
                                                error: touched.syllabusSubmissionTime && Boolean(errors.syllabusSubmissionTime),
                                                helperText: touched.syllabusSubmissionTime && errors.syllabusSubmissionTime,
                                            },
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                        disabled
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
                                        minDate={new Date()}
                                        name="syllabusReviewTime"
                                        slotProps={{
                                            textField: {
                                                placeholder: "",
                                                error: touched.syllabusReviewTime && Boolean(errors.syllabusReviewTime),
                                                helperText: touched.syllabusReviewTime && errors.syllabusReviewTime,
                                            },
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                        disabled
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
                                        minDate={new Date()}
                                        name="graduationProjectTime"
                                        slotProps={{
                                            textField: {
                                                placeholder: "",
                                                error: touched.graduationProjectTime && Boolean(errors.graduationProjectTime),
                                                helperText: touched.graduationProjectTime && errors.graduationProjectTime,
                                            },
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                        disabled
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
                                        minDate={new Date()}
                                        name="protectionTime"
                                        slotProps={{
                                            textField: {
                                                placeholder: "",
                                                error: touched.protectionTime && Boolean(errors.protectionTime),
                                                helperText: touched.protectionTime && errors.protectionTime,
                                            },
                                        }}
                                        format="dd/MM/yyyy"
                                        sx={{
                                            width: "100%",
                                            border: "none",
                                            "& fieldset": {border: "none"},
                                        }}
                                        disabled
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

export default observer(PeriodModal);
