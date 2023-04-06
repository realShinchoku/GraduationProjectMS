import * as React from "react";
import {useEffect} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useStore} from "../../../app/stores/store";
import {LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {observer} from "mobx-react-lite";
import {Field, Form, Formik} from "formik";
import {Autocomplete, AutocompleteRenderInputParams, TextField} from "formik-mui";
import {Grid, TextField as TF} from "@mui/material";
import {DepartmentSubjectFilterItem} from "../../../app/models/filterItem";
import * as Yup from 'yup';

const education = ['Tiến sĩ', 'Thạc sĩ'];

function AddLecturer() {
    const {modalStore, filterItemsStore: {getDepartmentSubjects, departmentSubjects}, lecturerStore} = useStore();
    useEffect(() => {
        if (departmentSubjects.length <= 0)
            getDepartmentSubjects();
    }, [departmentSubjects.length, getDepartmentSubjects]);

    return (
        <Formik
            initialValues={{
                displayName: '',
                departmentSubject: {id: '', displayName: ''},
                email: '',
                phoneNumber: '',
                education: '',
                error: null
            }}
            onSubmit={(values) => lecturerStore.create(values.email, values.displayName, values.education, values.phoneNumber, values.departmentSubject.id)}
            validationSchema={Yup.object().shape({
                email: Yup.string().email("Vui lòng nhập email!").required('Hãy điền email'),
                displayName: Yup.string().required('Hãy điền tên giảng viên'),
                phoneNumber: Yup.string().required('Hãy điền số điện thoại'),
                education: Yup.string().required('Hãy chọn học vấn'),
                departmentSubject: Yup.object().shape({
                    displayName: Yup.string().required('Hãy chọn bộ môn'),
                    id: Yup.string().required('Hãy chọn bộ môn'),
                })
            })}
        >
            {({dirty, errors, isSubmitting, isValid, touched}) =>
                <Form
                    className="add_lecturer"
                    style={{
                        width: "-webkit-fill-available",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#fff",
                        boxShadow: "24",
                        padding: "30px",
                        borderRadius: "10px",
                    }}
                >
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography sx={{marginBottom: "25px", fontSize: "2rem"}}>
                            Thêm Giảng Viên
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
                                    label="Tên giảng viên"
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
                                    component={Autocomplete}
                                    options={departmentSubjects}
                                    name={'departmentSubject'}
                                    fullWidth
                                    getOptionLabel={(option: DepartmentSubjectFilterItem) => option.displayName}
                                    renderInput={(params: AutocompleteRenderInputParams) => (
                                        <TF
                                            {...params}
                                            name="departmentSubject"
                                            error={!!touched.departmentSubject && Boolean(errors.departmentSubject)}
                                            helperText={!!touched.departmentSubject && Boolean(errors.departmentSubject) && 'Hãy chọn bộ môn'}
                                            label="Bộ môn"
                                            variant="outlined"
                                        />
                                    )}
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
                            <Grid item xs={6}>
                                <Field
                                    component={Autocomplete}
                                    options={education}
                                    name={'education'}
                                    fullWidth
                                    renderInput={(params: AutocompleteRenderInputParams) => (
                                        <TF
                                            {...params}
                                            name="education"
                                            error={touched.education && !!errors.education}
                                            helperText={touched.education && errors.education}
                                            label="Học vị"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{display: "flex", justifyContent: "right", marginTop: "30px"}}
                    >
                        <Button
                            variant="contained"
                            sx={{textTransform: "capitalize", marginRight: '20px', width: '90px'}}
                            onClick={modalStore.closeModal}
                        >
                            Thoát
                        </Button>
                        <LoadingButton
                            sx={{
                                marginRight: "20px",
                                width: "90px",
                                textTransform: "capitalize",
                            }}
                            variant="contained"
                            type={'submit'}
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                        >
                            Lưu
                        </LoadingButton>
                    </Box>
                </Form>
            }
        </Formik>
    );
}

export default observer(AddLecturer);