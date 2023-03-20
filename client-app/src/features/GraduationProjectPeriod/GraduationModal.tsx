import { Box, Button, TextField, Typography } from "@mui/material";
import "./Graduation.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { useStore } from "../../app/stores/store";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { date } from "yup";
import SnackBar from "./SnackBar";

export default function GraduationModal() {
  const { modalStore } = useStore();
  return (
    <Box className="Modal">
      <Formik
        initialValues={{
          name: "",
          contactInstructorTime: "",
          registerTopicTime: "",
          syllabusSubmissionTime: "",
          syllabusReviewTime: "",
          graduationProjectTime: "",
          protectionTime: "",
          startDate: date,
          endDate: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          isValid,
          dirty,
          isSubmitting,
          initialValues,
        }) => (
          <Form className="modalContent" onSubmit={handleSubmit}>
            <Grid container style={{ marginBottom: "20px" }} spacing={2}>
              <Grid xs={8}>
                <TextField
                  fullWidth
                  value="Đồ án khóa ..."
                  onChange={handleChange}
                  sx={{ border: "none", "& fieldset": { border: "none" } }}
                  inputProps={{ style: { fontSize: "1.25rem",fontWeight:"500",lineHeight:"1.6" } }}
                />
                
              </Grid>
              <Grid xs={4}>
                <Button
                  type="submit"
                  color="inherit"
                  variant="outlined"
                  className="button"
                  onClick={() => modalStore.openModal(<SnackBar />)}
                >
                  Tạo
                </Button>
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
                  <DatePicker
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
                  <DatePicker
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
                  <DatePicker
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
                  <DatePicker
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
                  <DatePicker
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
                  <DatePicker
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
                  <DatePicker
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
                  <DatePicker
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
