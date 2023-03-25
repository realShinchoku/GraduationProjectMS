import { Box, Button, Typography } from "@mui/material";
import "./Period.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { useStore } from "../../app/stores/store";
import { Field, Form, Formik } from "formik";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { PeriodFormValues } from "../../app/models/period";
import { useEffect, useState } from "react";
import { TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";
import { observer } from "mobx-react-lite";

interface Props {
  id?: string;
}

function PeriodModal({ id }: Props) {
  const {
    modalStore,
    periodStore: { create, edit, get },
  } = useStore();
  const [periodFormValues, setPeriodFormValues] = useState<PeriodFormValues>(
    new PeriodFormValues()
  );

  function handleFormSubmit(
    periodFormValues: PeriodFormValues,
    setErrors: any
  ) {
    if (!periodFormValues.id) {
      create({ ...periodFormValues, id: uuid() }).then(modalStore.closeModal);
    } else {
      edit(periodFormValues).then(modalStore.closeModal);
    }
  }

  useEffect(() => {
    if (id)
      get(id).then((period) => {
        setPeriodFormValues(new PeriodFormValues(period));
        console.log(period);
      });
  }, [id, setPeriodFormValues, get]);

  return (
    <Box className="Modal">
      <Formik
        enableReinitialize
        initialValues={{ ...periodFormValues, errors: null }}
        onSubmit={(values, { setErrors }) =>
          handleFormSubmit(values, setErrors)
        }
        validationSchema={Yup.object().shape({
          phase: Yup.number()
            .typeError("Nhập số khóa đồ án")
            .required("Vui lòng điền đủ thông tin"),
          course: Yup.number()
            .typeError("Nhập số đợt đồ án")
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
        {({ initialValues, dirty, isValid, isSubmitting, errors }) => (
          <Form className="modalContent">
            <Grid container spacing={2}>
              <Grid xs={10} className="contentTop">
                <Typography variant="h6">Đồ án Khóa K</Typography>
                <Field
                  component={TextField}
                  type="number"
                  name="course"
                  placeholder="..."
                  sx={{ border: "none", "& fieldset": { border: "none" } }}
                  inputProps={{
                    style: {
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      lineHeight: "1.6",
                      padding: "10px",
                      width: "40px",
                    },
                  }}
                  error={dirty && Boolean(errors.phase)}
                  helperText={dirty && errors.phase}
                />
                <Typography variant="h6">Đợt</Typography>
                <Field
                  component={TextField}
                  type="number"
                  name="phase"
                  placeholder="..."
                  sx={{ border: "none", "& fieldset": { border: "none" } }}
                  inputProps={{
                    style: {
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      lineHeight: "1.6",
                      padding: "10px",
                    },
                  }}
                  error={dirty && Boolean(errors.course)}
                  helperText={dirty && errors.course}
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
                  <Typography variant="h6" sx={{ paddingLeft: "14px" }}>
                    Ngày bắt đầu
                  </Typography>
                  <Field
                    component={DatePicker}
                    name="startDate"
                    minDate={new Date()}
                    slotProps={{
                      textField: {
                        placeholder: "",
                        error: dirty && Boolean(errors.startDate),
                        helperText: dirty && errors.startDate,
                      },
                    }}
                    format="dd/MM/yyyy"
                    sx={{
                      width: "100%",
                      border: "none",
                      "& fieldset": { border: "none" },
                    }}
                  />
                </Grid>
                <Grid md={3}>
                  <Typography variant="h6" sx={{ paddingLeft: "14px" }}>
                    Ngày kết thúc
                  </Typography>
                  <Field
                    component={DatePicker}
                    name="endDate"
                    minDate={new Date()}
                    slotProps={{
                      textField: {
                        placeholder: "",
                        error: dirty && Boolean(errors.endDate),
                        helperText: dirty && errors.endDate,
                      },
                    }}
                    format="dd/MM/yyyy"
                    sx={{
                      width: "100%",
                      border: "none",
                      "& fieldset": { border: "none" },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid xs={4}>
                <Box className="boxContent">
                  <Typography variant="body2" sx={{ paddingLeft: "14px" }}>
                    Thời Gian Liên Hệ Giảng Viên
                  </Typography>
                  <Field
                    component={DatePicker}
                    name="contactInstructorTime"
                    minDate={new Date()}
                    slotProps={{
                      textField: {
                        placeholder: "",
                        error: dirty && Boolean(errors.contactInstructorTime),
                        helperText: dirty && errors.contactInstructorTime,
                      },
                    }}
                    format="dd/MM/yyyy"
                    sx={{
                      width: "100%",
                      border: "none",
                      "& fieldset": { border: "none" },
                    }}
                  />
                </Box>
              </Grid>
              <Grid xs={4}>
                <Box className="boxContent">
                  <Typography variant="body2" sx={{ paddingLeft: "14px" }}>
                    Thời Gian Đăng Ký Đề Tài
                  </Typography>
                  <Field
                    component={DatePicker}
                    name="registerTopicTime"
                    minDate={new Date()}
                    slotProps={{
                      textField: {
                        placeholder: "",
                        error: dirty && Boolean(errors.registerTopicTime),
                        helperText: dirty && errors.registerTopicTime,
                      },
                    }}
                    format="dd/MM/yyyy"
                    sx={{
                      width: "100%",
                      border: "none",
                      "& fieldset": { border: "none" },
                    }}
                  />
                </Box>
              </Grid>
              <Grid xs={4}>
                <Box className="boxContent">
                  <Typography variant="body2" sx={{ paddingLeft: "14px" }}>
                    Thời Gian Nộp Đề Cương
                  </Typography>
                  <Field
                    component={DatePicker}
                    name="syllabusSubmissionTime"
                    minDate={new Date()}
                    slotProps={{
                      textField: {
                        placeholder: "",
                        error: dirty && Boolean(errors.syllabusSubmissionTime),
                        helperText: dirty && errors.syllabusSubmissionTime,
                      },
                    }}
                    format="dd/MM/yyyy"
                    sx={{
                      width: "100%",
                      border: "none",
                      "& fieldset": { border: "none" },
                    }}
                  />
                </Box>
              </Grid>
              <Grid xs={4}>
                <Box className="boxContent">
                  <Typography variant="body2" sx={{ paddingLeft: "14px" }}>
                    Thời Gian Duyệt Đề cương
                  </Typography>
                  <Field
                    component={DatePicker}
                    minDate={new Date()}
                    name="syllabusReviewTime"
                    slotProps={{
                      textField: {
                        placeholder: "",
                        error: dirty && Boolean(errors.syllabusReviewTime),
                        helperText: dirty && errors.syllabusReviewTime,
                      },
                    }}
                    format="dd/MM/yyyy"
                    sx={{
                      width: "100%",
                      border: "none",
                      "& fieldset": { border: "none" },
                    }}
                  />
                </Box>
              </Grid>
              <Grid xs={4}>
                <Box className="boxContent">
                  <Typography variant="body2" sx={{ paddingLeft: "14px" }}>
                    Thời Gian Làm Đồ Án
                  </Typography>
                  <Field
                    component={DatePicker}
                    minDate={new Date()}
                    name="graduationProjectTime"
                    slotProps={{
                      textField: {
                        placeholder: "",
                        error: dirty && Boolean(errors.graduationProjectTime),
                        helperText: dirty && errors.graduationProjectTime,
                      },
                    }}
                    format="dd/MM/yyyy"
                    sx={{
                      width: "100%",
                      border: "none",
                      "& fieldset": { border: "none" },
                    }}
                  />
                </Box>
              </Grid>
              <Grid xs={4}>
                <Box className="boxContent">
                  <Box>
                    <Typography variant="body2" sx={{ paddingLeft: "14px" }}>
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
                        error: dirty && Boolean(errors.protectionTime),
                        helperText: dirty && errors.protectionTime,
                      },
                    }}
                    format="dd/MM/yyyy"
                    sx={{
                      width: "100%",
                      border: "none",
                      "& fieldset": { border: "none" },
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

export default observer(PeriodModal);
