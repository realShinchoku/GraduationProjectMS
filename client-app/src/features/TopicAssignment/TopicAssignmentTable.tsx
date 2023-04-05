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
import {PagingParams} from "../../app/models/pagination";
import {observer} from "mobx-react-lite";
import LoadingCircular from "../../app/layout/LoadingCircular";

function TopicAssignmentTable() {
    const {studentStore:{studentsList,setPagingParams, pagination, loading},modalStore} = useStore();
    
    const handleChangePage = (event: unknown, newPage: number) => {
        setPagingParams(new PagingParams(newPage, pagination!.itemsPerPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPagingParams(new PagingParams(0, parseInt(event.target.value, 10)));
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
                    {!loading && <TableBody>
                        {studentsList.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left">{row.studentId}</TableCell>
                                <TableCell align="left">{row.displayName}</TableCell>
                                <TableCell align="left">{row.class}</TableCell>
                                <TableCell align="left">{row.faculty}</TableCell>
                                <TableCell align="right">
                                    <Button variant='contained' className='button_table'
                                            onClick={() => modalStore.openModal(<TopicAssignmentModal id={row.id}/>)}>
                                        Giao đề tài
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>}
                </Table>
            </TableContainer>
            {loading && <LoadingCircular />}
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

export default observer(TopicAssignmentTable);