import {observer} from "mobx-react-lite";
import { Form } from "react-router-dom";
import * as Yup from 'yup';
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Field, Formik } from "formik";

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
    retypePassword: Yup.string()
        .matches(
            /^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}.*$/,
            "Mật khẩu gồm ít nhất 8 kí tự trong đó bao gồm 1 kí tự hoa, 1 kí tự thường và 1 số"
        ).required("Vui lòng nhập mật khẩu")
        .oneOf([Yup.ref('newPassword')], "Mật khẩu không khớp"),
});

function ChangePassword() {

    const {userStore: {changePassword}} = useStore();

    return (
        <Box className="change_password">
            <Box className="inner">
                <Box className="close">×</Box>
                <Typography variant="h2">Đổi mật khẩu</Typography>
                <Typography variant="body1">Vì lý do bảo mật, bạn vui lòng nhập lại mật khẩu</Typography>
                <Formik
                    initialValues={{oldPassword: '', newPassword: '',retypePassword: '', error: {oldPassword: '', newPassword: '', retypePassword: ''}}}
                    onSubmit={(values, {setErrors}) => changePassword(values).catch((err: any) => {
                        setErrors({error: err});
                    })}
                    validationSchema={validationSchema}
                    >
                    {({handleSubmit, isSubmitting, errors, handleChange, isValid, dirty}) => (
                    <Form onSubmit={handleSubmit}>
                    <Field
                        name="oldPassword"
                        label="Mật khẩu cũ"
                        type="password"
                        fullWidth
                        as={TextField}
                        onChange={handleChange}
                        sx={{marginBottom: 2}}
                        error={(dirty && Boolean(errors.oldPassword)) || Boolean(errors.error?.oldPassword)}
                        helperText={(dirty && errors.oldPassword) || errors.error?.oldPassword}
                    />
                    <Field
                        name="newPassword"
                        type="password"
                        className="input"
                        label="Mật khẩu mới"
                        fullWidth
                        as={TextField}
                        onChange={handleChange}
                        sx={{marginBottom: 2}}
                        error={(dirty && Boolean(errors.newPassword)) || Boolean(errors.error?.newPassword)}
                        helperText={(dirty && errors.newPassword) || errors.error?.newPassword}
                    />
                    <Field
                        type="password"
                        className="input"
                        name="retypePassword"
                        label="Nhập lại mật khẩu mới"
                        fullWidth
                        as={TextField}
                        onChange={handleChange}
                        sx={{marginBottom: 2}}
                        error={(dirty && Boolean(errors.retypePassword)) || Boolean(errors.error?.retypePassword)}
                        helperText={(dirty && errors.retypePassword) || errors.error?.retypePassword}
                    />
                        <LoadingButton
                            color="primary" variant="contained"
                            type="submit"
                        >
                            Huỷ
                        </LoadingButton>

                        <LoadingButton
                            color="primary" variant="contained"
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

