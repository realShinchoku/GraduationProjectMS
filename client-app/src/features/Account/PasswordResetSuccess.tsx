import {observer} from "mobx-react-lite";
import {Box, Link,Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {route} from "../../app/router/Routers";
import './form.scss';


function PasswordResetSuccess() {
    return (
        <Grid className="account">
            <Grid className="container">
                <Grid className="thumb">
                    <Box className="logo"></Box>
                </Grid>
                <Grid className="SignUp_Form">
                    <Grid sx={{mx: 'auto'}} className="inner inner_resetPassSuccess">
                    <Grid className = "successIcon"><><CheckCircleOutlineIcon className="success"></CheckCircleOutlineIcon></></Grid>
                    <Typography className = "h3_fget" variant="h3">Password được đặt lại</Typography>
                    <Typography className = "h2_fget" variant="h6">Mật khẩu của bạn đã được thiết lập thành công</Typography>                    
                    </Grid>
                    <Grid className="form_Bottom">
                        <ArrowBackIcon className="back_Icon"></ArrowBackIcon>
                        <Link className = "forgotpd h2_fget" href={route.login} underline="none">Trở lại trang đăng nhập</Link>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
    );
}


export default observer(PasswordResetSuccess);

