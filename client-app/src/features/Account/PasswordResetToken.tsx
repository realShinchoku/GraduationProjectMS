import {observer} from "mobx-react-lite";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from '@mui/material/TextField';
import {useStore} from "../../app/stores/store";
import useQuery from "../../app/util/hooks";
import './form.scss';

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
    const token = useQuery().get('token') as string;
    const email = useQuery().get('email') as string;
    const {userStore: {resetPassword}} = useStore();
    return (
        <Grid className="container">
            <Grid className="thumb">
                <Box className="logo"></Box>
            </Grid>
            <Grid className="SignUp_Form">
                <Grid sx={{mx: 'auto'}} className="inner">
                    <Typography variant="h3">Đặt Lại mật khẩu</Typography>
                    <Formik
                        initialValues={{
                            password: '',
                            confirmPassword: '',
                            error: null
                        }}
                        onSubmit={(values, {setErrors}) => resetPassword(email, values.password, token).catch((err: any) => {
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
                                    error={(dirty && Boolean(errors.password) || Boolean(errors.error))}
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
                                    error={(dirty && Boolean(errors.confirmPassword))}
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
        </Grid>
    );
}


export default observer(PasswordResetToken);

