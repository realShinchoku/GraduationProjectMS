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
import ListOfInstructors from './ListOfInstructors';
import {useStore} from '../../app/stores/store';

function createData(
    msv: number,
    name: string,
    classroom: string,
    khoa: string,
    email: string,
) {
    return {msv, name, classroom, khoa, email};
}

const rows = [
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '19510609111@e.tlu.edu.vn'),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '19510609111@e.tlu.edu.vn'),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '19510609111@e.tlu.edu.vn'),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '19510609111@e.tlu.edu.vn'),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '19510609111@e.tlu.edu.vn'),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '19510609111@e.tlu.edu.vn'),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '19510609111@e.tlu.edu.vn'),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '19510609111@e.tlu.edu.vn'),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', '19510609111@e.tlu.edu.vn'),

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
                            <TableCell className='color_background' align="left">Email</TableCell>
                            <TableCell className='color_background' align="left"></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.msv}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.classroom}</TableCell>
                                <TableCell align="left">{row.khoa}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">
                                    <Button sx={{
                                        background: '#3690E3',
                                        color: '#ffffff',
                                        border: '1px solid #ffffff',
                                        borderRadius: '8px',
                                        boxShadow: 'none',
                                        width: '95px',
                                        whiteSpace: 'nowrap',
                                        textTransform: 'capitalize'
                                    }} variant="contained" onClick={() => modalStore.openModal(<ListOfInstructors/>)}>Phân
                                        Công</Button>
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
