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

function AccountDepartmentSubjectTable() {
    const {departmentSubjectStore: {departmentSubjectsList, setPagingParams, pagination}} = useStore();

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
                            <TableCell className='color_background' align="left">Tên Bộ Môn</TableCell>
                            <TableCell className='color_background' align="left">Ngày Tạo</TableCell>
                            <TableCell className='color_background' align="left">Email</TableCell>
                            <TableCell className='color_background' align="right">Mã Bộ Môn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departmentSubjectsList.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {pagination!.itemsPerPage * pagination!.currentPage + index + 1}
                                </TableCell>
                                <TableCell align="left">{row.displayName}</TableCell>
                                <TableCell align="left">{format(new Date(row.createdDate), "dd 'Th'M',' yyyy")}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="right">{row.username}</TableCell>
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

export default observer(AccountDepartmentSubjectTable);