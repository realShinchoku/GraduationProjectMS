import {observer} from "mobx-react-lite";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Link, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from '@mui/material/TextField';
import {useStore} from "../../app/stores/store";
import './form.scss';
import {route} from "../../app/router/Routers";
import {useState} from "react";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Vui lòng nhập email")
        .required("Vui lòng nhập email"),
});

function PasswordReset() {

    const {userStore: {sendResetPasswordLink}} = useStore();

    const [isSent, setIsSent] = useState(false);

    return (
        <Grid className="container">
            <Grid className="thumb">
                <Box className="logo"></Box>
            </Grid>
            <Grid className="SignUp_Form">
                <Grid sx={{mx: 'auto'}} className="inner">
                    <Typography variant="h3">RESET PASSWORD</Typography>
                    {isSent ?
                        <>
                            mail da dc gui vui long check email cua ban
                        </>
                        : <>
                            <Formik
                                initialValues={{email: '', error: null}}
                                onSubmit={(values, {setErrors}) => sendResetPasswordLink(values.email).then(() => setIsSent(true)).catch((err: any) => {
                                    setErrors({error: err.response.data});
                                })}
                                validationSchema={validationSchema}
                            >
                                {({handleSubmit, isSubmitting, errors, handleChange, isValid, dirty}) => (
                                    <Form onSubmit={handleSubmit}>
                                        <TextField
                                            className="input"
                                            fullWidth
                                            id="email"
                                            name="email"
                                            label="Email"
                                            onChange={handleChange}
                                            error={(dirty && Boolean(errors.email) || Boolean(errors.error))}
                                            helperText={(dirty && errors.email) || errors.error}
                                        />
                                        <LoadingButton
                                            color="primary" variant="contained"
                                            fullWidth
                                            loading={isSubmitting}
                                            disabled={!isValid || !dirty || isSubmitting}
                                            type="submit"
                                        >
                                            Xác nhận
                                        </LoadingButton>
                                    </Form>
                                )}
                            </Formik>
                            <Link href={route.login} underline="none">Đăng nhập</Link>

                        </>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default observer(PasswordReset);
