import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    Paper,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import {useStore} from '../../app/stores/store';

import CloseIcon from '@mui/icons-material/Close';
import UpdateSuccess from './UpdateSuccess';

function createData(
    mgv: number,
    namegv: string,
    emailgv: string,
    select: string,
) {
    return {mgv, namegv, emailgv, select};
}

const rows = [
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '1951060911@e.tlu.edu.vn', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '1951060911@e.tlu.edu.vn', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '1951060911@e.tlu.edu.vn', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '1951060911@e.tlu.edu.vn', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '1951060911@e.tlu.edu.vn', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '1951060911@e.tlu.edu.vn', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '1951060911@e.tlu.edu.vn', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '1951060911@e.tlu.edu.vn', ''),
    createData(1951060909, 'Nguyễn Thị Phương Thảo', '1951060911@e.tlu.edu.vn', ''),

];
export default function BasicModal() {
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
        <div>
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 1068,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                background: '#f4f4f4',
                maxHeight: '495px',
                padding: '40px 80px 10px 80px'
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Danh sách giáo viên hướng dẫn
                </Typography>
                <Button sx={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    border: 'none',
                    marginTop: '10px',
                    ':hover': {border: 'none', background: 'none'}
                }} variant="outlined"
                        startIcon={<CloseIcon sx={{'&:nth-of-type(1)': {fontSize: '30px'}, color: '#333'}}/>}
                        onClick={() => modalStore.closeModal()}></Button>
                <Paper sx={{width: '100%', overflow: 'hidden', boxShadow: 'none', marginBottom: '40px'}}>
                    <TableContainer sx={{maxHeight: '290px'}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className='color_background' align="left">Mã Giáo viên</TableCell>
                                    <TableCell className='color_background' align="left">Tên Giáo Viên</TableCell>
                                    <TableCell className='color_background' align="left">Email</TableCell>
                                    <TableCell className='color_background' align="left">Chọn</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.mgv}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.mgv}
                                        </TableCell>
                                        <TableCell align="left">{row.namegv}</TableCell>
                                        <TableCell align="left">{row.emailgv}</TableCell>
                                        <TableCell align="left">
                                            <Radio sx={{}}></Radio>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <Button sx={{
                    display: 'flex',
                    fontSize: '24px',
                    textTransform: 'capitalize',
                    padding: '0px 40px',
                    margin: 'auto'
                }} variant="contained" onClick={() => modalStore.openModal(<UpdateSuccess/>)}>Lưu</Button>
            </Box>
        </div>
    );
}