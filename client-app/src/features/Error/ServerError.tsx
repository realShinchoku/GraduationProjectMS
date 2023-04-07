import {observer} from "mobx-react-lite";
import {Box, Button, Link, Typography} from "@mui/material";
import {NotFound404} from "../../assets";
import "./Error.scss"

function ServerError() {
    return (
        <Box className="error">
            <Box className="inner">
                <Box className="txt">
                    <Typography variant="h2">OOPS .. </Typography>
                    <Typography variant="body1">Page not found</Typography>
                    <Box component="span">The page you are looking for doesn’t exist or any other error occurred, go
                        back to home page.</Box>
                    <Box>
                        <Link href="/">
                            <Button>Go Back</Button>
                        </Link>
                    </Box>
                </Box>
                <Box className="thumb">
                    <img src={NotFound404} alt=""/>
                </Box>
            </Box>
        </Box>
    );
}

export default observer(ServerError);