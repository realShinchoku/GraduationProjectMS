import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Typography} from "@mui/material";

import SimpleBadge from "./SimpaleMail";
import {AvatarSP} from "../../assets";
import { observer } from "mobx-react-lite";

function createData(
    lecturers: any,
    instructing: any,
    subject: any,
    faculty: any,
    degree: any,
    status: any,
    action: any,
) {
    return {
        lecturers,
        instructing,
        subject,
        faculty,
        degree,
        status,
        action,
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {

    const {row} = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{"& > *": {borderBottom: "unset"}}}>
                <TableCell align="center">
                    {row.lecturers}
                </TableCell>
                <TableCell align="center">{row.instructing}</TableCell>
                <TableCell align="center">{row.subject}</TableCell>
                <TableCell align="center">{row.faculty}</TableCell>
                <TableCell align="center">{row.degree}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                {open ? <TableCell></TableCell> : <TableCell align="center">{row.action}</TableCell>}
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" style={{padding: 0}} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Grid className="inner_contact">
                            <Grid className="thumb">
                                <img src={AvatarSP}/>
                            </Grid>
                            <Grid className="list">
                                <List>
                                    <ListItem component="a" href="https://www.google.com">
                                        <FiberManualRecordIcon/>
                                        <ListItemText primary="Các Đề Tài Hướng Dẫn"/>
                                    </ListItem>
                                    <ListItem component="a" href="https://www.google.com">
                                        <FiberManualRecordIcon/>
                                        <ListItemText primary="Các Đề Tài Hướng Dẫn"/>
                                    </ListItem>
                                </List>
                                <List>
                                    <ListItem component="a" href="https://www.google.com">
                                        <FiberManualRecordIcon/>
                                        <ListItemText primary="Thông Tin..."/>
                                    </ListItem>
                                    <ListItem component="a" href="https://www.google.com">
                                        <FiberManualRecordIcon/>
                                        <ListItemText primary="Thông Tin..."/>
                                    </ListItem>
                                </List>
                                <List>
                                    <ListItem component="a" href="https://www.google.com">
                                        <FiberManualRecordIcon/>
                                        <ListItemText primary="Thông Tin..."/>
                                    </ListItem>
                                    <ListItem component="a" href="https://www.google.com">
                                        <FiberManualRecordIcon/>
                                        <ListItemText primary="Thông Tin..."/>
                                    </ListItem>
                                </List>
                                <List>
                                    <ListItem component="a" href="https://www.google.com">
                                        <FiberManualRecordIcon/>
                                        <ListItemText primary="Thông Tin..."/>
                                    </ListItem>
                                    <ListItem component="a" href="https://www.google.com">
                                        <FiberManualRecordIcon/>
                                        <ListItemText primary="Thông Tin..."/>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid className="contact">
                                <SimpleBadge/>
                                <Typography>Liên Hệ Hướng Dẫn</Typography>
                            </Grid>
                        </Grid>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
export default observer(Row)

