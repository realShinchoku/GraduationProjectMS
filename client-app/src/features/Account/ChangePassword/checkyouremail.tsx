import {observer} from "mobx-react-lite";
import {Box, Link,Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {route} from "../../../app/router/Routers";
import '../form.scss';


function CheckYourEmail() {
    return (
        <Grid className="account">
            <Grid className="container">
                <Grid className="thumb">
                    <Box className="logo"></Box>
                </Grid>
                <Grid className="SignUp_Form">
                    <Grid sx={{mx: 'auto'}} className="inner inner_pass">
                    <Grid className = "keypass_vpn"><><MarkEmailReadIcon className="keypass"></MarkEmailReadIcon></></Grid>
                    <Typography className = "h3_fget" variant="h3">Kiểm tra Email của bạn</Typography>
                    <Typography className = "h2_fget" variant="h6">Chúng tôi gửi liên kết đặt lại mật khẩu tới abc@email.com.</Typography>
                    <Typography className = "h2_fget h2_resent" variant="h6">Không nhận được email ? <Link className = 'resent'>Gửi lại</Link></Typography>                    
                   
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


export default observer(CheckYourEmail);

