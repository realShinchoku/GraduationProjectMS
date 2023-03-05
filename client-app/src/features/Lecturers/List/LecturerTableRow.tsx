import {observer} from "mobx-react-lite";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import SimpleMail from "./SimpleMail";
import {Lecturer} from "../../../app/models/lecturer";
import LecturerTableRowDetail from "./LecturerTableRowDetail";

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
                {open ? 
                    <TableCell></TableCell>
                : 
                    <TableCell align="center" onClick={() => window.location.href = `mailto:${lecturer.email}`} >
                        <SimpleMail/>
                    </TableCell>
                }
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
            <LecturerTableRowDetail value={open} lecturer={lecturer}/>
        </React.Fragment>
    );
}

export default observer(LecturerTableRow)

