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
import {useState} from "react";
import "./Outline.scss"
import {useStore} from "../../app/stores/store";
import ApprovalModal from "./OutlineModal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {route} from "../../app/router/Routers";

function createData(
    msv: number,
    tensv: string,
    lop: string,
    khoa: string,
    tendetai: string,
    loaidetai: string,
    trangthai: boolean,
    tacvu: any
) {
    return {
        msv,
        tensv,
        lop,
        khoa,
        tendetai,
        loaidetai,
        trangthai,
        tacvu,
    };
}

const rows = [
    createData(
        1951060949,
        "Phạm Tuyết Anh",
        "61THNB",
        "Công nghệ thông tin",
        "Trang web bán khô gà",
        "Sản Phẩm",
        true,
        "Duyệt"
    ),
    createData(
        1951060949,
        "Phạm Tuyết Anh",
        "61THNB",
        "Công nghệ thông tin",
        "Trang web bán khô gà",
        "Sản Phẩm",
        false,
        "Duyệt"
    ),
    createData(
        1951060949,
        "Phạm Tuyết Anh",
        "61THNB",
        "Công nghệ thông tin",
        "Trang web bán khô gà",
        "Sản Phẩm",
        false,
        "Duyệt"
    ),
    createData(
        1951060949,
        "Phạm Tuyết Anh",
        "61THNB",
        "Công nghệ thông tin",
        "Trang web bán khô gà",
        "Sản Phẩm",
        true,
        "Duyệt"
    ),
    createData(
        1951060949,
        "Phạm Tuyết Anh",
        "61THNB",
        "Công nghệ thông tin",
        "Trang web bán khô gà",
        "Sản Phẩm",
        true,
        "Duyệt"
    ),
    createData(
        1951060949,
        "Phạm Tuyết Anh",
        "61THNB",
        "Công nghệ thông tin",
        "Trang web bán khô gà",
        "Sản Phẩm",
        true,
        "Duyệt"
    ),
];

function ConfirmOutlineTable() {
    const {modalStore} = useStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box className={'approval'}>
            <Box className="inner">
                <IconButton href={route.outline}>
                    <ArrowBackIcon/>
                </IconButton>
                <Box className="nav">
                    <Typography variant="h3">Duyệt Đề Cương</Typography>
                    <Typography variant="h6">Đồ án khóa k60 đợt 1</Typography>
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
                                    Tên đề cương
                                </TableCell>
                                <TableCell className="color_background" align="center">
                                    Url
                                </TableCell>
                                <TableCell className="color_background" align="center">
                                    Trạng thái
                                </TableCell>
                                <TableCell className="color_background" align="center">
                                    Tác vụ
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                >
                                    <TableCell align="center">{row.msv}</TableCell>
                                    <TableCell align="center">{row.tensv}</TableCell>
                                    <TableCell align="left">{row.lop}</TableCell>
                                    <TableCell align="left">{row.khoa}</TableCell>
                                    <TableCell align="center">{row.tendetai}</TableCell>
                                    <TableCell align="center">{row.loaidetai}</TableCell>
                                    <TableCell align="center">
                                        {row.trangthai ? "Đã duyệt" : "Chưa duyệt"}
                                    </TableCell>
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
                                            disabled={row.trangthai}
                                            onClick={() => modalStore.openModal(<ApprovalModal/>)}
                                        >
                                            Duyệt
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
        </Box>
    );
}

export default observer(ConfirmOutlineTable);
