import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import "./Notification.scss";

interface Props {
    tlt: string,
    txt: string,
}

export default function TxtNotification({tlt, txt}: Props) {

    return (
        <Typography variant='body1'>
            {tlt + ": "}
            <Box component="span">{txt}</Box>
        </Typography>
    );
}