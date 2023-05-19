import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

import "./Result.scss";

interface Column {
    id:
        | "fullName"
        | "studentID"
        | "grade"
        | "button";
    label: string;
    minWidth?: number;
    align?: "right" | "center";
    format?: (value: string | number) => string;
}

const columns: readonly Column[] = [
    { id: "studentID", label: "Mã sinh viên", minWidth: 100 },
    { id: "fullName", label: "Tên sinh viên", minWidth: 170 },
    {
        id: "grade",
        label: "Điểm",
        minWidth: 170,
        format: (value: string | number) => value.toLocaleString("en-US"),
    },
    {
        id: "button",
        label: "Tác vụ",
        minWidth: 50,
        align: "center",
        format: (): any => <Button variant="contained">Gửi kết quả</Button>,
    },
];

interface Data {
    fullName: string;
    studentID: number;
    grade: number;
    button: any;
    [key: string]: string | number | JSX.Element;
}

function createData(studentID: number, fullName: string, grade: number): Data {
    return {
        fullName,
        studentID,
        grade,
        button: <Button variant="contained">Gửi kết quả</Button>,
    };
}

const rows = [
    createData(1951060000, "Phạm Tuyết Anh", 8.5),
    createData(1951060001, "Phạm Tuyết Anh", 8.5),
    createData(1951060002, "Phạm Tuyết Anh", 8.5),
    createData(1951060003, "Phạm Tuyết Anh", 8.5),
    createData(1951060004, "Phạm Tuyết Anh", 8.5),
    createData(1951060005, "Phạm Tuyết Anh", 8.5),
    createData(1951060006, "Phạm Tuyết Anh", 8.5),
    createData(1951060007, "Phạm Tuyết Anh", 8.5),
    createData(1951060008, "Phạm Tuyết Anh", 8.5),
    createData(1951060009, "Phạm Tuyết Anh", 8.5),
    createData(1951060010, "Phạm Tuyết Anh", 8.5),
];

export default function Result() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                    <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.studentID}
                    >
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                        );
                        })}
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    );
}
