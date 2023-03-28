import {observer} from "mobx-react-lite";
import {Form} from "react-router-dom";
import * as Yup from 'yup';
import {Box, Typography} from "@mui/material";
import {TextField} from "formik-mui";
import {LoadingButton} from "@mui/lab";
import {Field, Formik} from "formik";

import {useStore} from "../../app/stores/store";
import './Account.scss';

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .matches(
            /^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}.*$/,
            "Mật khẩu gồm ít nhất 8 kí tự trong đó bao gồm 1 kí tự hoa, 1 kí tự thường và 1 số"
        ).required("Vui lòng nhập mật khẩu"),
    newPassword: Yup.string()
        .matches(
            /^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}.*$/,
            "Mật khẩu gồm ít nhất 8 kí tự trong đó bao gồm 1 kí tự hoa, 1 kí tự thường và 1 số"
        ).required("Vui lòng nhập mật khẩu"),
    confirmPassword: Yup.string()
        .matches(
            /^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}.*$/,
            "Mật khẩu gồm ít nhất 8 kí tự trong đó bao gồm 1 kí tự hoa, 1 kí tự thường và 1 số"
        ).required("Vui lòng nhập mật khẩu")
        .oneOf([Yup.ref('newPassword')], "Mật khẩu không khớp"),
});

function ChangePassword() {

    const {userStore: {changePassword}, modalStore: {closeModal}} = useStore();

    return (
        <Box className="change_password">
            <Box className="inner">
                <Box className="close" onClick={closeModal}>×</Box>
                <Typography variant="h2">Đổi mật khẩu</Typography>
                <Typography variant="body1">Vì lý do bảo mật, bạn vui lòng nhập lại mật khẩu</Typography>
                <Formik          
                    initialValues={{
                        oldPassword: '', 
                        newPassword: '', 
                        confirmPassword: '', 
                        error: {
                            oldPassword: null, 
                            newPassword: null, 
                            confirmPassword: null
                        }}}
                    onSubmit={(values, {setErrors}) => changePassword(values).catch((err: any) => {
                        const error = {
                            oldPassword: err.oldPassword, 
                            newPassword: err.newPassword,  
                            confirmPassword: err.confirmPassword
                        };
                        setErrors({error: error});
                    })}
                    validationSchema={validationSchema}
                >
                    {({handleSubmit, isSubmitting, errors, isValid, dirty, touched}) => (
                        <Form onSubmit={handleSubmit}>
                            <Field
                                component={TextField}
                                fullWidth
                                name="oldPassword"
                                label="Mật khẩu cũ"
                                type="password"
                                sx={{marginBottom: 2}}
                                error={(touched.oldPassword && Boolean(errors.oldPassword)) || Boolean(errors.error?.oldPassword)}
                                helperText={(touched.oldPassword && errors.oldPassword) || errors.error?.oldPassword}
                            />
                            <Field
                                component={TextField}
                                fullWidth
                                name="newPassword"
                                type="password"
                                label="Mật khẩu mới"
                                sx={{marginBottom: 2}}
                                error={(touched.newPassword && Boolean(errors.newPassword)) || Boolean(errors.error?.newPassword)}
                                helperText={(touched.newPassword && errors.newPassword) || errors.error?.newPassword}
                            />
                            <Field
                                component={TextField}
                                fullWidth
                                name="confirmPassword"
                                label="Nhập lại mật khẩu mới"
                                type="password"
                                sx={{marginBottom: 2}}
                                error={(touched.confirmPassword && Boolean(errors.confirmPassword)) || Boolean(errors.error?.confirmPassword)}
                                helperText={(touched.confirmPassword && errors.confirmPassword) || errors.error?.confirmPassword}
                            />
                            <LoadingButton
                                color="primary" 
                                variant="contained"
                                onClick={closeModal}
                            >
                                Huỷ
                            </LoadingButton>
                            <LoadingButton
                                color="primary" 
                                variant="contained"
                                loading={isSubmitting}
                                disabled={!isValid || !dirty || isSubmitting}
                                type="submit"
                            >
                                Lưu
                            </LoadingButton>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}

export default observer(ChangePassword);

