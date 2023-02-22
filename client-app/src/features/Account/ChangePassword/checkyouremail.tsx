import {observer} from "mobx-react-lite";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Link, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useStore } from "../../../app/stores/store";
import TextField from '@mui/material/TextField';
import './../form.scss';
import {useState} from "react";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { route } from "../../../app/router/Routers";


function Checkyouremail() {
    return (
        <Grid className="container">
            <Grid className="thumb">
                <Box className="logo">
                </Box>
            </Grid>
            <Grid className="SignUp_Form">
                <Grid sx={{mx: 'auto'}} className="inner inner_pass">
                    <Grid className = "keypass_vpn"><><VpnKeyIcon className="keypass"></VpnKeyIcon></></Grid>
                    <Typography className = "h3_fget" variant="h3">Quên mật khẩu?</Typography>
                    <Typography className = "h2_fget" variant="h6">Chúng tôi sẽ gửi cho bạn đường dẫn đặt lại mật khẩu.</Typography>
                        <Link className = "forgotpd h2_fget" href={route.login} underline="none">Đăng nhập</Link>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default observer(Checkyouremail);

