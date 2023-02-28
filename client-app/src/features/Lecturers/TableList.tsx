import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Typography } from "@mui/material";

import SimpleBadge from "./SimpaleMail";
import { AvatarSP } from "../../assets";

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
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell align="center">
            {row.lecturers}
            </TableCell>
            <TableCell align="center">{row.instructing}</TableCell>
            <TableCell align="center">{row.subject}</TableCell>
            <TableCell align="center">{row.faculty}</TableCell>
            <TableCell align="center">{row.degree}</TableCell>
            <TableCell align="center">{row.status}</TableCell>
            {open ? <TableCell></TableCell>:<TableCell align="center">{row.action}</TableCell>}
            <TableCell>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell component="th" style={{ padding: 0 }} colSpan={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Grid className="inner_contact">
                        <Grid className="thumb">
                            <img src={AvatarSP} />
                        </Grid>
                        <Grid className="list">
                            <List>
                                <ListItem component="a" href="https://www.google.com">
                                    <FiberManualRecordIcon/>
                                    <ListItemText primary="Các Đề Tài Hướng Dẫn" />
                                </ListItem>
                                <ListItem component="a" href="https://www.google.com">
                                    <FiberManualRecordIcon/>
                                    <ListItemText primary="Các Đề Tài Hướng Dẫn" />
                                </ListItem>
                            </List>
                            <List>
                                <ListItem component="a" href="https://www.google.com">
                                    <FiberManualRecordIcon/>
                                    <ListItemText primary="Thông Tin..." />
                                </ListItem>
                                <ListItem component="a" href="https://www.google.com">
                                    <FiberManualRecordIcon/>
                                    <ListItemText primary="Thông Tin..." />
                                </ListItem>
                            </List>
                            <List>
                                <ListItem component="a" href="https://www.google.com">
                                    <FiberManualRecordIcon/>
                                    <ListItemText primary="Thông Tin..." />
                                </ListItem>
                                <ListItem component="a" href="https://www.google.com">
                                    <FiberManualRecordIcon/>
                                    <ListItemText primary="Thông Tin..." />
                                </ListItem>
                            </List>
                            <List>
                                <ListItem component="a" href="https://www.google.com">
                                    <FiberManualRecordIcon/>
                                    <ListItemText primary="Thông Tin..." />
                                </ListItem>
                                <ListItem component="a" href="https://www.google.com">
                                    <FiberManualRecordIcon/>
                                    <ListItemText primary="Thông Tin..." />
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

const rows = [
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận', <SimpleBadge/>),
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận', <SimpleBadge/>),
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận', <SimpleBadge/>),
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận', <SimpleBadge/>),
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận', <SimpleBadge/>),
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận', <SimpleBadge/>),
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận', <SimpleBadge/>),
];

export default function TableList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const currentRows = rows.filter((r, ind) => {
        return ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} className="table">
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Giảng Viên</TableCell>
                        <TableCell align="center">Đang Hướng Dẫn(SV)</TableCell>
                        <TableCell align="center">Bộ Môn</TableCell>
                        <TableCell align="center">Khoa</TableCell>
                        <TableCell align="center">Học Vị</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                        <TableCell align="center">Tác vụ</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody sx={{ background: '#F7F6FE' }}>
                    {currentRows.map((row, index) => (
                        <Row key={index} row={row}/>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
