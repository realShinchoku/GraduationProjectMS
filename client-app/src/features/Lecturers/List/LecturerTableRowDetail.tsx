import {observer} from "mobx-react-lite";
import {useState} from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Box, Button, ButtonGroup, Typography} from "@mui/material";
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

    const [isActive, setIsActive] = useState(false);
    
    return (
        <TableRow>
            <TableCell component="th" style={{padding: 0, position: 'relative'}} colSpan={12}>
                <Collapse in={value} timeout="auto" unmountOnExit>
                    <Grid className="inner_contact">
                        <Grid className="thumb">
                            <Box component="img" src={LecturerImages.AvatarLecturer} alt="" />
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
                            <ButtonGroup
                                orientation="vertical"
                                aria-label="vertical outlined button group"
                                sx={{width: 'fit-content', background: '#EBF9F1',}}
                            >
                                <Button className="contact_guide" sx={{"&:hover": {backgroundColor: '#D1FBE3'},}}
                                onClick={() => window.location.href = `mailto:${lecturer.email}`}
                                >
                                    <Box component="img" src={LecturerImages.ContactLecturer} alt="" />
                                    <Typography variant="body1">Liên hệ hướng dẫn</Typography>
                                </Button>
                                <Button className="choose_lecturer" onClick={chose(lecturer.id).then(() =>setIsActive(current => !current))}>Chọn giảng viên</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    <Box className={isActive ? 'modal open' : 'modal'}>
                        <Box className="content">
                            <Typography variant="body1">Chọn giảng viên</Typography>
                            <Box component="span">thành công</Box>
                        </Box>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
}

export default observer(LecturerTableRowDetail)

