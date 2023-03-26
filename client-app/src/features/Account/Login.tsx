import {observer} from "mobx-react-lite";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Link, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from '@mui/material/TextField';
import SchoolIcon from '@mui/icons-material/School';
import {route} from "../../app/router/Routers";
import {useStore} from "../../app/stores/store";
import './Account.scss';

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
                            initialValues={{email: '', password: '', error: {email: '', password: ''}}}
                            onSubmit={(values, {setErrors}) => login(values).catch((err: any) => {
                                setErrors({error: err});
                            })}
                            validationSchema={validationSchema}
                        >
                            {({handleSubmit, isSubmitting, errors, handleChange, isValid, dirty, touched}) => (
                                <Form onSubmit={handleSubmit}>
                                    <TextField
                                        className="input"
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Tài khoản"
                                        onChange={handleChange}
                                        error={(touched.email && Boolean(errors.email)) || Boolean(errors.error?.email)}
                                        helperText={(touched.email && errors.email) || errors.error?.email}
                                    />
                                    <TextField
                                        className="input"
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Mật khẩu"
                                        type="password"
                                        onChange={handleChange}
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

