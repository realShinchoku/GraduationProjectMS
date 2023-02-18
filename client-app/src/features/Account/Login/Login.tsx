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
                        initialValues={{email: '', password: '', error: null}}
                        onSubmit={(values, {setErrors}) => login(values).catch(err =>
                            // setErrors({error: err.response.data}))}
                            console.log(err.response.data.password[0]))}

                        validationSchema={validationSchema}
                    >
                        {({handleSubmit, isSubmitting, errors, handleChange, touched}) => (
                            <Form onSubmit={handleSubmit}>
                                <TextField
                                    className="input"
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Tài khoản"
                                    onChange={handleChange}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                                <TextField
                                    className="input"
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    onChange={handleChange}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                                <LoadingButton color="primary" variant="contained" fullWidth loading={isSubmitting}
                                               type="submit">Đăng nhập</LoadingButton>
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
