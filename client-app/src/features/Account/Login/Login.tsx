import {observer} from "mobx-react-lite";
import {Box, Link, Typography} from "@mui/material";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import styles from "./login.scss";
import {useStore} from "../../../app/stores/store";
import {LoadingButton} from "@mui/lab";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Vui lòng nhập email!")
        .required("Vui lòng nhập email!"),
    password: Yup.string()
        .matches(
            /^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}.*$/,
            "Mật khẩu gồm ít nhất 8 kí tự trong đó bao gồm 1 kí tự hoa, 1 kí tự thường và 1 số!"
        ).required("Vui lòng nhập mật khẩu!"),
});

function Login() {
    const {userStore: {login}} = useStore();    
    return (
        <Box className={styles.container}>
            <Box className={styles.thumb}>
                <Box className="logo"></Box>
            </Box>
            <Box className="SignUp_Form">
                <Box className="inner">
                    <Typography variant="h3">XIN CHÀO</Typography>
                    <Formik
                        initialValues={{email: '', password: '', error: {email: '', password:''}}}
                        onSubmit={(values, {setErrors}) => login(values).catch((err: any) =>
                        {
                            setErrors({error: err});
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
                                    label="Tài khoản"
                                    onChange={handleChange}
                                    error={(dirty && Boolean(errors.email) || Boolean(errors.error?.email))}
                                    helperText={(dirty && errors.email) || errors.error?.email}
                                />
                                <TextField
                                    className="input"
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    onChange={handleChange}
                                    error={(dirty && Boolean(errors.password) || Boolean(errors.error?.password))}
                                    helperText={(dirty && errors.password) || errors.error?.password}
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
                </Box>
                <Link href="" underline="none">Quên mật khẩu</Link>
            </Box>
        </Box>
    );
}

export default observer(Login);
