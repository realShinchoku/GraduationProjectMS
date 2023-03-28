import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { useStore } from '../../app/stores/store';
import TopicAssignmentModal from './TopicAssignmentModal';

function createData(
    studentID: number,
    displayName: string,
    clasS: string,
    faculty: string,
    status: string,
) {
    return {studentID, displayName, clasS, faculty, status};
}

const rows = [
    createData(195156, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', ''),
    createData(195156, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', ''),
    createData(195156, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', ''),
    createData(195156, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', ''),
    createData(195156, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', ''),
    createData(195156, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', ''),
    createData(195156, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', ''),
    createData(195156, 'Nguyễn Thị Phương Thảo', '61THNB', 'CNTT', ''),
];

function TopicAssignmentTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const {modalStore} = useStore();
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{width: '100%', overflow: 'hidden', boxShadow: 'none'}}>
            <TableContainer className='topic_assignment_table'>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='color_text' align="left">Mã sinh viên</TableCell>
                            <TableCell className='color_text' align="left">Tên sinh viên</TableCell>
                            <TableCell className='color_text' align="left">Lớp</TableCell>
                            <TableCell className='color_text' align="left">Khoa</TableCell>
                            <TableCell sx={{paddingRight:'40px'}} className='color_text label' align="right">Trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left">{row.studentID}</TableCell>
                                <TableCell align="left">{row.displayName}</TableCell>
                                <TableCell align="left">{row.clasS}</TableCell>
                                <TableCell align="left">{row.faculty}</TableCell>
                                <TableCell align="right">{row.status}
                                <Button variant='contained' className='button_table' onClick={() => {
                            modalStore.openModal(<TopicAssignmentModal/>)
                        }}>
                                    Giao đề tài
                                </Button>
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

export default TopicAssignmentTable;