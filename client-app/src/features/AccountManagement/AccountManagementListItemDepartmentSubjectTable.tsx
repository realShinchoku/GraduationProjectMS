import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function createData(
    stt: number,
    name: string,
    date: string,
    email: string,
    bmcode: string
) {
    return {stt, name, date, email, bmcode};
}

const rows = [
    createData(1, 'Nguyễn Thị Phương Thảo', '03/03/2001', '1951060919@e.tlu.edu.vn', 'cntt'),
    createData(2, 'Nguyễn Thị Phương Thảo', '03/03/2001', '1951060919@e.tlu.edu.vn', 'cntt'),
    createData(3, 'Nguyễn Thị Phương Thảo', '03/03/2001', '1951060919@e.tlu.edu.vn', 'cntt'),
    createData(4, 'Nguyễn Thị Phương Thảo', '03/03/2001', '1951060919@e.tlu.edu.vn', 'cntt'),
    createData(5, 'Nguyễn Thị Phương Thảo', '03/03/2001', '1951060919@e.tlu.edu.vn', 'cntt'),
    createData(6, 'Nguyễn Thị Phương Thảo', '03/03/2001', '1951060919@e.tlu.edu.vn', 'cntt'),
    createData(7, 'Nguyễn Thị Phương Thảo', '03/03/2001', '1951060919@e.tlu.edu.vn', 'cntt'),
];

function AccountManagementListItemDepartmentSubjectTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                            <TableCell className='color_background' align="left">STT</TableCell>
                            <TableCell className='color_background' align="left">Tên Bộ Môn</TableCell>
                            <TableCell className='color_background' align="left">Ngày Tạo</TableCell>
                            <TableCell className='color_background' align="left">Email</TableCell>
                            <TableCell className='color_background' align="left">Mã Bộ Môn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.bmcode}</TableCell>
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

export default AccountManagementListItemDepartmentSubjectTable;