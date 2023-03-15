import {useStore} from "../../../app/stores/store";
import {PagingParams} from "../../../app/models/pagination";
import {
    Box,
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
import LecturerTableRow from "./LecturerTableRow";
import {observer} from "mobx-react-lite";
import { red } from "@mui/material/colors";

function LecturerTable() {

    const {lecturerStore: {lecturersList, setPagingParams, pagination, loading}} = useStore();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPagingParams(new PagingParams(newPage, pagination!.itemsPerPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPagingParams(new PagingParams(0, parseInt(event.target.value, 10)));
    };


    return (
        <TableContainer component={Paper} className="table">
            <Table aria-label="collapsible table" >
                <TableHead>
                    <TableRow >
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
                {!loading ?
                    (
                        <TableBody sx={{background: '#F7F6FE'}}>
                            {lecturersList.map((lecturer) =>
                                <LecturerTableRow key={lecturer.id} lecturer={lecturer}/>
                            )}
                        </TableBody>
                    ):(
                        <TableBody sx={{background: '#F7F6FE'}}>
                            {[...Array(pagination?.itemsPerPage || 5)].map((x, i) =>
                                <TableRow sx={{
                                    padding: 0,
                                    marginTop: 0.125,
                                    marginBottom: 0.125, 
                                    height: 67,
                                    "& > *": {borderBottom: "unset", 
                                }}} 
                                    key={i}>
                                    <TableCell align="center"><Skeleton sx={{width: 100}}/></TableCell>
                                    <TableCell align="center"><Skeleton sx={{width: 30}}/></TableCell>
                                    <TableCell align="center"><Skeleton sx={{width: 80}}/></TableCell>
                                    <TableCell align="center"><Skeleton sx={{width: 120}}/></TableCell>
                                    <TableCell align="center"><Skeleton sx={{width: 60}}/></TableCell>
                                    <TableCell align="center"><Skeleton sx={{width: 20}}/></TableCell>
                                    <TableCell align="center"><Skeleton sx={{width: 30}}/></TableCell>
                                    <TableCell align="center"><Skeleton sx={{width: 30}}/></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    )
                }
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pagination?.totalItems || 0}
                rowsPerPage={pagination?.itemsPerPage || 10}
                page={pagination?.currentPage || 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default observer(LecturerTable);
