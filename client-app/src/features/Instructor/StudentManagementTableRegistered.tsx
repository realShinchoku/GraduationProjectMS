import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import {Button} from '@mui/material';
import BrowsingStatus from './BrowsingStatus';
import {useStore} from '../../app/stores/store';
import {useEffect} from "react";
interface Props {
    periodId: string;
}
export default function StudentManagementTable({periodId}:Props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const {modalStore, instructorStore: {loadLists, instructors, instructorsList, setPredicate}} = useStore();
    
    useEffect(() => {
        if (instructors.size <= 0) {
            setPredicate('periodId', periodId);
        }
    }, [setPredicate, instructors.size]);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{width: '100%', overflow: 'hidden', boxShadow: 'none'}}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='color_background' align="left">Mã Sinh viên</TableCell>
                            <TableCell className='color_background' align="left">Tên Sinh Viên</TableCell>
                            <TableCell className='color_background' align="left">Lớp</TableCell>
                            <TableCell className='color_background' align="left">Khoa</TableCell>
                            <TableCell className='color_background' align="left">Ngày Đăng Ký</TableCell>
                            <TableCell className='color_background' align="left">Mã Giáo Viên</TableCell>
                            <TableCell className='color_background' align="left">Tên Giáo Viên</TableCell>
                            <TableCell className='color_background' align="left">Trạng Thái</TableCell>
                            <TableCell className='color_background' align="left">Trạng Thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {instructorsList.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{row.studentId}</TableCell>
                                <TableCell align="left">{row.student}</TableCell>
                                <TableCell align="left">{row.class}</TableCell>
                                <TableCell align="left">{row.faculty}</TableCell>
                                <TableCell align="left">{row.createdDate.toDateString()}</TableCell>
                                <TableCell align="left">{row.lecturer}</TableCell>
                                <TableCell align="left">{row.lecturer}</TableCell>
                                <TableCell align="left">{row.approvalStatus}</TableCell>
                                <TableCell align="left">
                                    <Button sx={{
                                        background: '#3690E3',
                                        color: '#ffffff',
                                        border: '1px solid #ffffff',
                                        borderRadius: '8px',
                                        boxShadow: 'none',
                                        width: '95px',
                                        textTransform: 'capitalize'
                                    }} variant="contained"
                                            onClick={() => modalStore.openModal(<BrowsingStatus/>)}>Duyệt</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={12}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
