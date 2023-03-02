import {observer} from "mobx-react-lite";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import LecturerTableRow from "./LecturerTableRow";
import {useStore} from "../../../app/stores/store";

function LecturerTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // const currentRows = rows.filter((r, ind) => {
    //     return ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
    // });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const {lecturerStore: {lecturersList}} = useStore();


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
                    {lecturersList.map((lecturer) =>
                        <LecturerTableRow key={lecturer.id} lecturer={lecturer}/>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={12}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default observer(LecturerTable)
