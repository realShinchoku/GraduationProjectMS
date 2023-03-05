import React, {useState} from "react";
import { useStore } from "../../../app/stores/store";
import {PagingParams} from "../../../app/models/pagination";
import {
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import LoadingCircular from "../../../app/layout/LoadingCircular";
import LecturerTableRow from "./LecturerTableRow";
import {observer} from "mobx-react-lite";

function LecturerTable() {
    const [loadingNext, setLoadingNext] = useState(false);

    const {lecturerStore: {loadLecturers, lecturersList, setPagingParams, pagination, loading}} = useStore();

    const handleChangePage = (event: unknown, newPage: number) => {
        setLoadingNext(true);
        setPagingParams(new PagingParams(newPage, pagination!.itemsPerPage));
        loadLecturers().then(() => setLoadingNext(false));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingNext(true);
        setPagingParams(new PagingParams(0, parseInt(event.target.value, 10)));
        loadLecturers().then(() => setLoadingNext(false));
    };


    return (
        <TableContainer component={Paper} className="table">
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Giảng Viên</TableCell>
                        <TableCell align="center">Đang Hướng Dẫn(SV)</TableCell>
                        <TableCell align="center">Bộ Môn</TableCell>
                        <TableCell align="center">Khoa</TableCell>
                        <TableCell align="center">Học Vị</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                        <TableCell align="center">Tác vụ</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                {loading ?
                    <>
                        <Skeleton animation="wave" sx={{width: "100%"}} />
                    </>
                    :
                    <TableBody sx={{background: '#F7F6FE'}}>
                        {lecturersList.map((lecturer) =>
                            <LecturerTableRow key={lecturer.id} lecturer={lecturer}/>
                        )}
                    </TableBody>
                }
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pagination?.totalItems || 0}
                rowsPerPage={pagination?.itemsPerPage || 5}
                page={pagination?.currentPage || 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default observer(LecturerTable);
