import {observer} from "mobx-react-lite";
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Link, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {useStore} from "../../app/stores/store";
import {route} from "../../app/router/Routers";
import * as React from "react";
import {useState} from "react";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import './Account.scss';
import {TextField} from "formik-mui";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Vui lòng nhập email")
        .required("Vui lòng nhập email"),
});

function PasswordReset() {

    const {userStore: {sendResetPasswordLink}} = useStore();
    const [email, setEmail] = useState('');

    return (
        <Grid className="account">
            <Grid className="container">
                <Grid className="thumb">
                    <Box className="logo">
                    </Box>
                </Grid>
                {email !== '' ?
                    <Grid className="SignUp_Form">
                        <Grid sx={{mx: 'auto'}} className="inner">
                            <Grid className="iconKey">
                                <MarkEmailReadIcon className="nameKey"/>
                            </Grid>
                            <Typography variant="h3">Kiểm tra Email của bạn</Typography>
                            <Typography variant="h6">Chúng tôi gửi liên kết đặt lại mật khẩu tới {email}.</Typography>
                            <Typography className="h2_fget h2_resent" variant="h6">Không nhận được email ? <Link
                                onClick={() => sendResetPasswordLink(email)} className='resent'>Gửi
                                lại</Link></Typography>

                        </Grid>
                        <Grid className="form_Bottom">
                            <ArrowBackIcon className="back_Icon"></ArrowBackIcon>
                            <Link className="backLogin h2_fget" href={route.login} underline="none">Trở lại trang đăng
                                nhập</Link>
                        </Grid>
                    </Grid>
                    :
                    <Grid className="SignUp_Form">
                        <Grid sx={{mx: 'auto'}} className="inner">
                            <Grid className="iconKey"><><VpnKeyIcon className="nameKey"></VpnKeyIcon></>
                            </Grid>
                            <Typography variant="h3">Quên mật khẩu?</Typography>
                            <Typography variant="h6">Chúng tôi sẽ gửi cho bạn đường dẫn đặt lại mật khẩu.</Typography>
                            <Formik
                                initialValues={{email: '', error: null}}
                                onSubmit={(values, {setErrors}) => sendResetPasswordLink(values.email).then(() => setEmail(values.email)).catch((err: any) => {
                                    setErrors({error: err.response.data});
                                })}
                                validationSchema={validationSchema}
                            >
                                {({handleSubmit, isSubmitting, errors, handleChange, isValid, dirty, touched}) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Field
                                            component={TextField}
                                            className="input"
                                            fullWidth
                                            id="email"
                                            name="email"
                                            label="Email"
                                            error={(touched.email && Boolean(errors.email)) || Boolean(errors.error)}
                                            helperText={(touched.email && errors.email) || errors.error}
                                        />
                                        <LoadingButton
                                            color="primary" variant="contained"
                                            fullWidth
                                            loading={isSubmitting}
                                            disabled={!isValid || !dirty || isSubmitting}
                                            type="submit"
                                        >
                                            Đặt lại mật khẩu
                                        </LoadingButton>
                                    </Form>
                                )}
                            </Formik>
                            <Link className="backLogin" href={route.login} underline="none">Đăng nhập</Link>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Grid>
    );
}

export default observer(PasswordReset);

