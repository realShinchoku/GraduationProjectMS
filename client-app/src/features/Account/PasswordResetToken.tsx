import {observer} from "mobx-react-lite";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Link, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from '@mui/material/TextField';
import {useStore} from "../../app/stores/store";
import useQuery from "../../app/util/hooks";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {useState} from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {route} from "../../app/router/Routers";
import './Account.scss';

const validationSchema = Yup.object().shape({

    password: Yup.string()
        .matches(
            /^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}.*$/,
            "Mật khẩu gồm ít nhất 8 kí tự trong đó bao gồm 1 kí tự hoa, 1 kí tự thường và 1 số!"
        ).required("Vui lòng nhập lại mật khẩu"),
    confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),

});

function PasswordResetToken() {
    const [isReset, setIsReset] = useState(false);
    const token = useQuery().get('token') as string;
    const email = useQuery().get('email') as string;
    const {userStore: {resetPassword}} = useStore();
    return (
        <Grid className="account resetPass">
            <Grid className="container">
                <Grid className="thumb">
                    <Box className="logo"></Box>
                </Grid>
                {isReset ?
                    <Grid className="SignUp_Form">
                        <Grid sx={{mx: 'auto'}} className="inner">
                            <Grid className="successIcon">
                                <CheckCircleOutlineIcon className="success"/>
                            </Grid>
                            <Typography variant="h3">Password được đặt lại</Typography>
                            <Typography variant="h6">Mật khẩu của bạn đã được thiết lập thành công</Typography>
                        </Grid>
                        <Grid className="form_Bottom">
                            <ArrowBackIcon className="back_Icon"></ArrowBackIcon>
                            <Link className="back_Reset" href={route.login} underline="none">Trở lại trang đăng
                                nhập</Link>
                        </Grid>
                    </Grid>
                    :
                    <Grid className="SignUp_Form">
                        <Grid sx={{mx: 'auto'}} className="inner ">
                            <Grid className="iconKey"><VpnKeyIcon className='nameKey'/></Grid>
                            <Typography variant="h3">Đặt lại mật khẩu?</Typography>
                            <Typography variant="h6">
                                Mật khẩu mới của bạn phải khác với mật khẩu đã sử dụng trước đó
                            </Typography>
                            <Formik
                                initialValues={{
                                    password: '',
                                    confirmPassword: '',
                                    error: null
                                }}
                                onSubmit={(values, {setErrors}) => resetPassword(email, values.password, token).then(() => setIsReset(true)).catch((err: any) => {
                                    setErrors({error: err.response.data});
                                })}
                                validationSchema={validationSchema}
                            >
                                {({handleSubmit, isSubmitting, errors, handleChange, isValid, dirty}) => (
                                    <Form onSubmit={handleSubmit}>
                                        <TextField
                                            className="input"
                                            fullWidth
                                            id="password"
                                            name="password"
                                            label="Mật khẩu mới"
                                            type="password"
                                            onChange={handleChange}
                                            error={(dirty && Boolean(errors.password)) || Boolean(errors.error)}
                                            helperText={(dirty && errors.password) || errors.error}
                                        />
                                        <TextField
                                            className="input"
                                            fullWidth
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            label="Nhập lại mật khẩu mới"
                                            type="password"
                                            onChange={handleChange}
                                            error={dirty && Boolean(errors.confirmPassword)}
                                            helperText={(dirty && errors.confirmPassword)}
                                        />
                                        <LoadingButton
                                            color="primary" variant="contained"
                                            fullWidth
                                            loading={isSubmitting}
                                            disabled={!isValid || !dirty || isSubmitting}
                                            type="submit"
                                        >
                                            Đồng ý
                                        </LoadingButton>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Grid>
    );
}


export default observer(PasswordResetToken);

