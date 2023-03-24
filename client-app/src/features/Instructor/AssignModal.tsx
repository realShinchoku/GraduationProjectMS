import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    Paper,
    Radio,
    Skeleton,
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
import {PagingParams} from "../../app/models/pagination";
import {observer} from "mobx-react-lite";
import SuccessModal from "./SuccessModal";
import StudentStore from "../../app/stores/studentStore";

interface Props {
    studentId: string;
    studentStore: StudentStore;
}

function AssignModal({studentId, studentStore}: Props) {

    const {
        modalStore,
        lecturerStore: {lecturers, lecturersList, setPagingParams, pagination, loading, setPredicate},
        instructorStore: {assign}
    } = useStore();
    const handleChangePage = (event: unknown, newPage: number) => {
        setPagingParams(new PagingParams(newPage, pagination!.itemsPerPage));
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPagingParams(new PagingParams(0, parseInt(event.target.value, 10)));
    };

    const [lecturerId, setLecturerId] = useState('');

    useEffect(() => {
        if (lecturers.size <= 0)
            setPredicate('IsDepartmentSubject', true);
    })

    return (
        <Box
            sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 1068,
                backgroundColor: 'background.paper',
                boxShadow: 24,
                p: 4,
                background: '#f4f4f4',
                maxHeight: '495px',
                padding: '40px 80px 10px 80px'
            }}
        >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Danh sách giáo viên hướng dẫn
            </Typography>
            <Button
                sx={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    border: 'none',
                    marginTop: '10px',
                    ':hover': {border: 'none', background: 'none'}
                }}
                variant="outlined"
                startIcon={<CloseIcon sx={{'&:nth-of-type(1)': {fontSize: '30px'}, color: '#333'}}/>}
                onClick={() => modalStore.closeModal()}/>
            {loading ?
                <Paper sx={{width: '100%', overflow: 'hidden', boxShadow: 'none', marginBottom: '40px'}}>
                    <TableContainer sx={{maxHeight: '290px'}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className='color_background' align="left">STT</TableCell>
                                    <TableCell className='color_background' align="left">Tên Giáo Viên</TableCell>
                                    <TableCell className='color_background' align="left">Email</TableCell>
                                    <TableCell className='color_background' align="left">Chọn</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell className='color_background' align="left"><Skeleton animation="wave" width="20%" height={28} /></TableCell>
                                    <TableCell className='color_background' align="left"><Skeleton animation="wave" width="20%" height={28} /></TableCell>
                                    <TableCell className='color_background' align="left"><Skeleton animation="wave" width="20%" height={28} /></TableCell>
                                    <TableCell className='color_background' align="left"><Skeleton animation="wave" width="20%" height={28} /></TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell className='color_background' align="left"><Skeleton animation="wave" width="20%" height={28} /></TableCell>
                                    <TableCell className='color_background' align="left"><Skeleton animation="wave" width="20%" height={28} /></TableCell>
                                    <TableCell className='color_background' align="left"><Skeleton animation="wave" width="20%" height={28} /></TableCell>
                                    <TableCell className='color_background' align="left"><Skeleton animation="wave" width="20%" height={28} /></TableCell>
                                </TableRow>
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
                : <>
                    <Paper sx={{width: '100%', overflow: 'hidden', boxShadow: 'none', marginBottom: '40px'}}>
                        <TableContainer sx={{maxHeight: '290px'}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='color_background' align="left">STT</TableCell>
                                        <TableCell className='color_background' align="left">Tên Giáo Viên</TableCell>
                                        <TableCell className='color_background' align="left">Email</TableCell>
                                        <TableCell className='color_background' align="left">Chọn</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lecturersList.map((row, index) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            onClick={() => setLecturerId(row.id)}
                                        >
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="left">{row.displayName}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">
                                                <Radio value={row.id} checked={row.id === lecturerId}/>
                                            </TableCell>
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
                    <Button
                        sx={{
                            display: 'flex',
                            fontSize: '24px',
                            textTransform: 'capitalize',
                            padding: '0px 40px',
                            margin: 'auto'
                        }}
                        variant="contained"
                        onClick={() => assign(studentId, lecturerId).then(() => studentStore.removeItem(studentId)).then(() => modalStore.openModal(
                            <SuccessModal/>))}
                    >Lưu</Button>
                </>
            }
        </Box>
    );
}

export default observer(AssignModal)