import {observer} from "mobx-react-lite";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Typography} from "@mui/material";
import SimpleMail from "./SimpleMail";
import Collapse from "@mui/material/Collapse";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import {AvatarSP} from "../../../assets";
import {Lecturer} from "../../../app/models/lecturer";

type Props = {
    value: boolean,
    lecturer: Lecturer,
};

function LecturerTableRowDetail({value,lecturer}: Props) {
    return (
        <TableRow>
            <TableCell component="th" style={{padding: 0}} colSpan={12}>
                <Collapse in={value} timeout="auto" unmountOnExit>
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
                        <Grid className="contact" onClick={() => window.location.href = `mailto:${lecturer.email}`}>
                            <SimpleMail/>
                            <Typography>Liên Hệ Hướng Dẫn</Typography>
                        </Grid>
                    </Grid>
                </Collapse>
            </TableCell>
        </TableRow>
    );
}

export default observer(LecturerTableRowDetail)

