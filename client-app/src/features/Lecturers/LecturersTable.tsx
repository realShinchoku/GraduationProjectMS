import { observer } from "mobx-react-lite";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import Row from "./LecturersRow";
import SimpleBadge from "./SimpaleMail";

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

const rows = [
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận',
        <SimpleBadge/>),
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận',
        <SimpleBadge/>),
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận',
        <SimpleBadge/>),
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận',
        <SimpleBadge/>),
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận',
        <SimpleBadge/>),
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận',
        <SimpleBadge/>),
    createData('Nguyễn Thị Phương Thảo', '3/5', 'Mạng Máy Tính', 'Hệ Thống Thông Tin', 'Tiến Sĩ', 'Tiếp Nhận',
        <SimpleBadge/>),
];

function LecturersTable() {
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
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody sx={{background: '#F7F6FE'}}>
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
export default observer(LecturersTable)
