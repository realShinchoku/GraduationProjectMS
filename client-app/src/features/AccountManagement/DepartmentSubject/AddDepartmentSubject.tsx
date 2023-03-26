import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import {useStore} from "../../../app/stores/store";
import {LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {observer} from "mobx-react-lite";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {TextField} from "formik-mui";


function AddDepartmentSubject() {
    const {modalStore, departmentSubjectStore} = useStore();

    return (
        <Formik
            initialValues={{
                displayName: '',
                email: '',
                phoneNumber: '',
                username: '',
                error: null
            }}
            onSubmit={(values) => departmentSubjectStore.create(values.email, values.displayName, values.username, values.phoneNumber)}
            validationSchema={Yup.object().shape({
                email: Yup.string().email("Vui lòng đúng email!").required('Hãy điền email'),
                displayName: Yup.string().required('Hãy điền tên giảng viên'),
                phoneNumber: Yup.string().required('Hãy điền số điện thoại'),
                username: Yup.string().required('Hãy chọn học vấn'),
            })}
        >
            {({dirty, errors, isSubmitting, isValid, touched}) =>
                <Form
                    className="add_subject"
                    style={{
                        width: "-webkit-fill-available",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#fff",
                        boxShadow: "24",
                        borderRadius: "10px",
                    }}
                >
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography sx={{marginBottom: "25px", fontSize: "2rem"}}>
                            
                            Thêm Bộ Môn
                        </Typography>
                        <Button
                            sx={{position: "absolute", right: "0", ':hover': {border: 'none', background: 'none'}}}
                            startIcon={<CloseIcon/>}
                            onClick={modalStore.closeModal}
                        ></Button>
                    </Box>
                    <Box sx={{width: "100%"}}>
                        <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                            <Grid item xs={6}>
                                <Field
                                    component={TextField}
                                    label="Tên bộ môn"
                                    name="displayName"
                                    fullWidth
                                    error={touched.displayName && Boolean(errors.displayName)}
                                    helperText={touched.displayName && errors.displayName}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    component={TextField}
                                    label="Email"
                                    name="email"
                                    fullWidth
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    component={TextField}
                                    label="Mã bộ môn"
                                    name="username"
                                    fullWidth
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    component={TextField}
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    fullWidth
                                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{display: "flex", justifyContent: "right", marginTop: "30px"}}
                    >
                        <LoadingButton
                            sx={{marginRight: "20px", width: "90px"}}
                            variant="contained"
                            type={'submit'}
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                        >
                            Lưu
                        </LoadingButton>
                        <Button variant="contained" onClick={modalStore.closeModal}>
                            Thoát
                        </Button>
                    </Box>
                </Form>
            }
        </Formik>
    );
}

export default observer(AddDepartmentSubject);