import { Box, Button, Typography } from "@mui/material";

import { NotFound404 } from "../../assets";
import "./Error.scss"
export default function NotFound() {
    return (
        <Box className="error">
            <Box className="inner">
                <Box className="txt">
                    <Typography variant="h2">OOPS .. </Typography>
                    <Typography variant="body1" >Page not found</Typography>    
                    <Box component="span">The page you are looking for doesn’t exist or any other error occurred, go back to home page.</Box>
                    <Box>
                        <Button>Go Back</Button>
                    </Box>
                </Box>
                <Box className="thumb">
                    <img src={NotFound404} alt="" />
                </Box>
            </Box>
        </Box>
    );
}