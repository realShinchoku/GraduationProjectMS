import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "./StudentManagement.scss"
import {Button} from '@mui/material';
import BrowsingStatus from './BrowsingStatus';
import { useStore } from '../../app/stores/store';

function createData(
    msv: number,
    name: string,
    classroom: string,
    khoa: string,
    date: string,
    magv: number,
    namegv: string,
    status: string,
    status_wait: string,
) {
    return {msv, name, classroom, khoa, date, magv, namegv, status, status_wait};
}

const rows = [
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '03/03/2001', 1951060911, 'Nguyễn Thị Phương Thảo', 'Null', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '03/03/2001', 1951060911, 'Nguyễn Thị Phương Thảo', 'Null', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '03/03/2001', 1951060911, 'Nguyễn Thị Phương Thảo', 'Null', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '03/03/2001', 1951060911, 'Nguyễn Thị Phương Thảo', 'Null', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '03/03/2001', 1951060911, 'Nguyễn Thị Phương Thảo', 'Null', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '03/03/2001', 1951060911, 'Nguyễn Thị Phương Thảo', 'Null', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '03/03/2001', 1951060911, 'Nguyễn Thị Phương Thảo', 'Null', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '03/03/2001', 1951060911, 'Nguyễn Thị Phương Thảo', 'Null', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '03/03/2001', 1951060911, 'Nguyễn Thị Phương Thảo', 'Null', ''),

];

export default function StudentManagementTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const {modalStore} = useStore();

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
                        {rows.map((row) => (
                            <TableRow
                                key={row.msv}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.msv}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.classroom}</TableCell>
                                <TableCell align="left">{row.khoa}</TableCell>
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">{row.magv}</TableCell>
                                <TableCell align="left">{row.namegv}</TableCell>
                                <TableCell align="left">{row.status}</TableCell>
                                <TableCell align="left">
                                    <Button sx={{
                                        background: '#3690E3',
                                        color: '#ffffff',
                                        border: '1px solid #ffffff',
                                        borderRadius: '8px',
                                        boxShadow: 'none',
                                        width: '95px',
                                        textTransform:'capitalize'
                                    }} variant="contained" onClick={() => modalStore.openModal(<BrowsingStatus/>)} >Duyệt</Button>
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
