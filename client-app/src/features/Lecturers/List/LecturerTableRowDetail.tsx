import {observer} from "mobx-react-lite";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Button, ButtonGroup, Typography} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {LecturerImages} from "../../../assets";
import {Lecturer} from "../../../app/models/lecturer";
import {useStore} from "../../../app/stores/store";

type Props = {
    value: boolean,
    lecturer: Lecturer,
};

function LecturerTableRowDetail({value, lecturer}: Props) {
  
    const {instructorStore:{chose}} = useStore();
    
    return (
        <TableRow>
            <TableCell component="th" style={{padding: 0}} colSpan={12}>
                <Collapse in={value} timeout="auto" unmountOnExit>
                    <Grid className="inner_contact">
                        <Grid className="thumb">
                            <img src={LecturerImages.AvatarLecturer} alt={""}/>
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
                            <ButtonGroup
                                orientation="vertical"
                                aria-label="vertical outlined button group"
                                sx={{width: 'fit-content', background: '#EBF9F1',}}
                            >
                                <Grid sx={{"&:hover": {backgroundColor: '#D1FBE3'},}}>
                                    <img className="img_contact_lecturer" src={LecturerImages.ContactLecturer}
                                         alt={""}/>
                                    <Button className="contact_guide">
                                        <Typography className="typo_contact_guide">Liên hệ hướng dẫn</Typography>
                                    </Button>
                                </Grid>
                                <Button className="choose_lecturer" onClick={() => chose(lecturer.id)}>Chọn giảng viên</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Collapse>
            </TableCell>
        </TableRow>
    );
}

export default observer(LecturerTableRowDetail)

