import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {PagingParams} from "../../../app/models/pagination";
import {format} from "date-fns";

function AccountLecturerTable() {
    const {lecturerStore: {lecturersList, setPagingParams, pagination, loading}} = useStore();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPagingParams(new PagingParams(newPage, pagination!.itemsPerPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPagingParams(new PagingParams(0, parseInt(event.target.value, 10)));
    };


    return (
        <Paper sx={{width: '100%', overflow: 'hidden', boxShadow: 'none'}}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='color_background' align="left">STT</TableCell>
                            <TableCell className='color_background' align="left">Tên Giảng Viên</TableCell>
                            <TableCell className='color_background' align="left">Bộ Môn</TableCell>
                            <TableCell className='color_background' align="left">Khoa</TableCell>
                            <TableCell className='color_background' align="left">Ngày tạo</TableCell>
                            <TableCell className='color_background' align="right">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lecturersList.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">{row.displayName}</TableCell>
                                <TableCell align="left">{row.departmentSubjects}</TableCell>
                                <TableCell align="left">{row.faculty}</TableCell>
                                <TableCell align="left">{format(new Date(row.createdDate), "dd 'Th'M',' yyyy")}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pagination?.totalItems || 0}
                rowsPerPage={pagination?.itemsPerPage || 10}
                page={pagination?.currentPage || 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default observer(AccountLecturerTable);