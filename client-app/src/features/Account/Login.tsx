import {observer} from "mobx-react-lite";
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Link, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SchoolIcon from '@mui/icons-material/School';
import {route} from "../../app/router/Routers";
import {useStore} from "../../app/stores/store";
import './Account.scss';
import * as React from "react";
import {TextField} from "formik-mui";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Vui lòng nhập email!")
        .required("Vui lòng nhập email"),
    password: Yup.string()
        .matches(
            /^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}.*$/,
            "Mật khẩu gồm ít nhất 8 kí tự trong đó bao gồm 1 kí tự hoa, 1 kí tự thường và 1 số"
        ).required("Vui lòng nhập mật khẩu"),
});

function Login() {

    const {userStore: {login}} = useStore();
    return (
        <Grid className="account">
            <Grid className="container">
                <Grid className="thumb">
                    <Box className="logo"></Box>
                </Grid>
                <Grid className="SignUp_Form">
                    <Grid sx={{mx: 'auto'}} className="inner inner_pass">
                        <Grid className="school_icon"><><SchoolIcon className="schoolicon"></SchoolIcon></>
                        </Grid>
                        <Typography variant="h3">Đăng nhập</Typography>
                        <Formik
                            initialValues={{email: '', password: '', error: {email: null, password: null}}}
                            onSubmit={(values, {setErrors}) => login(values).catch((err: any) => {
                                const error = {email: err.email, password: err.password};
                                setErrors({error: error});
                            })}
                            validationSchema={validationSchema}
                        >
                            {({handleSubmit, isSubmitting, errors, isValid, dirty, touched}) => (
                                <Form onSubmit={handleSubmit}>
                                    <Field
                                        component={TextField}
                                        className="input"
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email"
                                        error={(touched.email && Boolean(errors.email)) || Boolean(errors.error?.email)}
                                        helperText={(touched.email && errors.email) || errors.error?.email}
                                    />
                                    <Field
                                        component={TextField}
                                        className="input"
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Mật khẩu"
                                        type="password"
                                        error={(touched.password && Boolean(errors.password)) || Boolean(errors.error?.password)}
                                        helperText={(touched.password && errors.password) || errors.error?.password}
                                    />
                                    <LoadingButton
                                        color="primary" variant="contained"
                                        fullWidth
                                        loading={isSubmitting}
                                        disabled={!isValid || !dirty || isSubmitting}
                                        type="submit"
                                    >
                                        Đăng nhập
                                    </LoadingButton>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                    <Link className="backLogin" href={route.resetPassword} underline="none">Quên mật khẩu?</Link>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default observer(Login);

