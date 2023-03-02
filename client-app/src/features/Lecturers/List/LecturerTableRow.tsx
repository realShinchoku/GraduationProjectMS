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
import {observer} from "mobx-react-lite";
import SimpleMail from "./SimpleMail";
import {Lecturer} from "../../../app/models/lecturer";
import {AvatarSP} from "../../../assets";


interface Props {
    lecturer: Lecturer;
}

function LecturerTableRow({lecturer}: Props) {

    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{"& > *": {borderBottom: "unset"}}}>
                <TableCell align="center">{lecturer.displayName}</TableCell>
                <TableCell align="center">{lecturer.studentCount + "/" + lecturer.maxStudentsNumber}</TableCell>
                <TableCell align="center">{lecturer.departmentSubjects}</TableCell>
                <TableCell align="center">{lecturer.faculty}</TableCell>
                <TableCell align="center">{lecturer.education}</TableCell>
                <TableCell align="center">{lecturer.status}</TableCell>
                {open ? <TableCell></TableCell> : <TableCell align="center"><SimpleMail/></TableCell>}
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
                                <img src={AvatarSP} alt={""}/>
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
                                <SimpleMail/>
                                <Typography>Liên Hệ Hướng Dẫn</Typography>
                            </Grid>
                        </Grid>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default observer(LecturerTableRow)

