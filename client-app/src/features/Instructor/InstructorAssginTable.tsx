import * as React from 'react';
import {useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Button, Skeleton} from '@mui/material';
import {observer} from "mobx-react-lite";

import {useStore} from '../../app/stores/store';
import {PagingParams} from "../../app/models/pagination";
import AssignModal from "./AssignModal";

interface Props {
    periodId: string;
}

function InstructorAssginTable({periodId}: Props) {
    const {modalStore: {openModal}, periodStore: {studentStores}} = useStore();
    const studentStore = studentStores.get(periodId)!;
    const {loadList, students, studentsList, loading, pagination, setPagingParams} = studentStore;

    useEffect(() => {
        if (students.size <= 0)
            loadList();
    }, [loadList, students.size]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPagingParams(new PagingParams(newPage, pagination!.itemsPerPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPagingParams(new PagingParams(0, parseInt(event.target.value, 10)));
    };

    if (loading)
        return (
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
                        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell align="left"><Skeleton animation="wave" width="50%" height={28}/></TableCell>
                            <TableCell align="left"><Skeleton animation="wave" width="50%" height={28}/></TableCell>
                            <TableCell align="left"><Skeleton animation="wave" width="50%" height={28}/></TableCell>
                            <TableCell align="left"><Skeleton animation="wave" width="50%" height={28}/></TableCell>
                            <TableCell align="left"><Skeleton animation="wave" width="50%" height={28}/></TableCell>
                            <TableCell align="left"><Skeleton animation="wave" width="50%" height={28}/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
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
                        {studentsList.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.studentId}
                                </TableCell>
                                <TableCell align="left">{row.displayName}</TableCell>
                                <TableCell align="left">{row.class}</TableCell>
                                <TableCell align="left">{row.faculty}</TableCell>
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
                                    }} variant="contained"
                                            onClick={() => openModal(<AssignModal studentStore={studentStore}
                                                                                  studentId={row.id}/>)}>Phân
                                        Công</Button>
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
    );
}

export default observer(InstructorAssginTable)
