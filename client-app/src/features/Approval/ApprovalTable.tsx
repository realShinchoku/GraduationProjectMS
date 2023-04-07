// import * as React from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {Box, Button, IconButton, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import "./Approval.scss"
import {useStore} from "../../app/stores/store";
import ApprovalModal from "./ApprovalModal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {route} from "../../app/router/Routers";
import {PagingParams} from "../../app/models/pagination";
import useQuery from "../../app/util/hooks";
import {useParams} from "react-router-dom";
import LoadingCircular from "../../app/layout/LoadingCircular";
import {Role} from "../../app/models/user";

function ConfirmProjectTable() {
    const {id} = useParams();
    const name = useQuery().get("name") as string;
    const {
        modalStore,
        userStore,
        topicStore: {setPagingParams, pagination, setPeriod, loading, loadList, topicsList}
    } = useStore();
    const handleChangePage = (event: unknown, newPage: number) => {
        setPagingParams(new PagingParams(newPage, pagination!.itemsPerPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPagingParams(new PagingParams(0, parseInt(event.target.value, 10)));
    };

    useEffect(() => {
        if (id) {
            setPeriod(id);
            loadList();
        }
    }, [id, loadList, setPeriod]);

    return (
        <Box className={'approval'}>
            <Box className="inner">
                <IconButton href={route.project}>
                    <ArrowBackIcon/>
                </IconButton>
                <Box className="nav">
                    <Typography variant="h3">Duyệt Đề Tài</Typography>
                    <Typography variant="h6">{name}</Typography>
                </Box>
            </Box>
            <Paper sx={{width: "100%", overflow: "hidden", boxShadow: "none"}}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="color_background" align="center">
                                    Mã sinh viên
                                </TableCell>
                                <TableCell className="color_background" align="center">
                                    Tên sinh viên
                                </TableCell>
                                <TableCell className="color_background" align="center">
                                    Lớp
                                </TableCell>
                                <TableCell className="color_background" align="center">
                                    Khoa
                                </TableCell>
                                <TableCell className="color_background" align="center">
                                    Tên đề tài
                                </TableCell>
                                <TableCell className="color_background" align="center">
                                    Loại đề tài
                                </TableCell>
                                <TableCell className="color_background" align="center">
                                    Tên giáo viên
                                </TableCell>
                                <TableCell className="color_background" align="center">
                                    Trạng thái
                                </TableCell>
                                <TableCell className="color_background" align="center">
                                    Tác vụ
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {!loading && <TableBody>
                            {topicsList.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                >
                                    <TableCell align="center">{row.studentId}</TableCell>
                                    <TableCell align="center">{row.studentName}</TableCell>
                                    <TableCell align="left">{row.class}</TableCell>
                                    <TableCell align="left">{row.faculty}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.type}</TableCell>
                                    <TableCell align="center">{row.lecturer}</TableCell>
                                    {userStore.getRole === Role.Lecturer ?
                                        <TableCell align="center">
                                            {row.lecturerApproval ? "Đã duyệt" : "Chưa duyệt"}
                                        </TableCell>
                                        :
                                        <TableCell align="center">
                                            {row.departmentSubjectApproval ? "Đã duyệt" : "Chưa duyệt"}
                                        </TableCell>
                                    }
                                    <TableCell align="center">
                                        <Button
                                            sx={{
                                                background: "#3690E3",
                                                color: "#ffffff",
                                                border: "1px solid #ffffff",
                                                borderRadius: "8px",
                                                boxShadow: "none",
                                                width: "95px",
                                                textTransform: "capitalize",
                                            }}
                                            variant="contained"
                                            disabled={(userStore.getRole === Role.Lecturer && row.lecturerApproval) || (userStore.getRole === Role.DepartmentSubject && row.departmentSubjectApproval)}
                                            onClick={() => modalStore.openModal(<ApprovalModal id={row.id}/>)}
                                        >
                                            Duyệt
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}
                    </Table>
                </TableContainer>
                {loading && <LoadingCircular/>}
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
        </Box>
    );
}

export default observer(ConfirmProjectTable);
