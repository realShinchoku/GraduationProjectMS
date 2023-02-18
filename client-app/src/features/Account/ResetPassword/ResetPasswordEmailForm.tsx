import {observer} from "mobx-react-lite";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Link, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from '@mui/material/TextField';

import {useStore} from "../../../app/stores/store";


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Vui lòng nhập email!")
        .required("Vui lòng nhập email!"),
});

function Login() {
  
    const {userStore: {login}} = useStore();
    return (
        <Grid className="container">
            <Grid className="thumb">
                <Box className="logo"></Box>
            </Grid>
            <Grid className="SignUp_Form">
              <Grid sx={{ mx: 'auto' }} className="inner">
                <Typography variant="h3">RESET PASSWORD</Typography>
                <Formik
                    initialValues={{email: '', password: '', error: {email: '', password:''}}}
                    // onSubmit={(values, {setErrors}) => login(values).catch((err: any) =>
                    // {
                    //     setErrors({error: err});
                    // })}
                    onSubmit={()=>console.log("")}
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
              </Grid>
            </Grid>
        </Grid>
    );
}

export default observer(Login);
