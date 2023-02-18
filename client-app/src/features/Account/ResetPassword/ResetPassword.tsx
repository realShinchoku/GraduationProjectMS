import { observer } from "mobx-react-lite";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Link, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from '@mui/material/TextField';

import { useStore } from "../../../app/stores/store";
import "./ResetPassword.scss";

const validationSchema = Yup.object().shape({

    newPassword: Yup.string()
        .matches(
            /^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}.*$/,
            "Mật khẩu gồm ít nhất 8 kí tự trong đó bao gồm 1 kí tự hoa, 1 kí tự thường và 1 số!"
        ).required("Vui lòng nhập lại mật khẩu!"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Mật khẩu không trùng khớp'),

});

function ResetPassword() {

    const { userStore: { resetPassword } } = useStore();
    return (
        <Grid className="container">
            <Grid className="thumb">
                <Box className="logo"></Box>
            </Grid>
            <Grid className="SignUp_Form">
                <Grid sx={{ mx: 'auto' }} className="inner">
                    <Typography variant="h3">Đặt Lại mật khẩu</Typography>
                    <Formik
                        initialValues={{ newPassword: '', confirmPassword: '', error: { newPassword: '', confirmPassword: '' } }}
                        // onSubmit={(values, {setErrors}) => resetPassword(values).catch((err: any) =>
                        // {
                        //     setErrors({error: err});
                        // })}
                        onSubmit={() => console.log("")}
                        validationSchema={validationSchema}
                    >
                        {({ handleSubmit, isSubmitting, errors, handleChange, isValid, dirty }) => (
                            <Form onSubmit={handleSubmit}>
                                <TextField
                                    className="input"
                                    fullWidth
                                    id="newPassword"
                                    name="newPassword"
                                    label="Mật khẩu mới"
                                    type="password"
                                    onChange={handleChange}
                                    error={(dirty && Boolean(errors.newPassword) || Boolean(errors.error?.newPassword))}
                                    helperText={(dirty && errors.newPassword) || errors.error?.newPassword}
                                />
                                <TextField
                                    className="input"
                                    fullWidth
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Nhập lại password mới"
                                    type="password"
                                    onChange={handleChange}
                                    error={(dirty && Boolean(errors.confirmPassword) || Boolean(errors.error?.confirmPassword))}
                                    helperText={(dirty && errors.confirmPassword) || errors.error?.confirmPassword}
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
                <Link href="" underline="none">Quay lại trang chủ</Link>
            </Grid>
        </Grid>
    );
}


export default observer(ResetPassword);

