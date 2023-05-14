import * as React from "react";
import { observer } from "mobx-react-lite";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
interface Column {
  id:
    | "studentID"
    | "fullName"
    | "class"
    | "faculty"
    | "registrationDate"
    | "exchangeTime"
    | "task1"
    | "task2";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: string | number) => string | JSX.Element;
}

const columns: readonly Column[] = [
  { id: "studentID", label: "Mã sinh viên", minWidth: 100 },
  { id: "fullName", label: "Tên sinh viên", minWidth: 170 },
  { id: "class", label: "Lớp", minWidth: 100 },
  { id: "faculty", label: "Khoa", minWidth: 100 },
  { id: "registrationDate", label: "Ngày đăng ký", minWidth: 100 },
  { id: "exchangeTime", label: "Thời gian trao đổi", minWidth: 100 },
  {
    id: "task1",
    label: "Tác vụ 1",
    minWidth: 50,
    align: "center",
    format: (): any => <Button variant="contained">Gửi kết quả</Button>,
  },
  {
    id: "task2",
    label: "Tác vụ 2",
    minWidth: 50,
    align: "center",
    format: (): any => <Button variant="contained">Gửi kết quả</Button>,
  },
];

interface Data {
  fullName: string;
  studentID: number;
  grade: number;
  class: string;
  faculty: string;
  [key: string]: string | number | JSX.Element;
}

function Student() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  function createData(
    studentID: number,
    fullName: string,
    grade: number,
    classStr: string,
    facultyStr: string
  ): Data {
    return {
      fullName,
      studentID,
      grade,
      class: classStr,
      faculty: facultyStr,
      registrationDate: "01/01/2023",
      exchangeTime: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label="Controlled picker"
                value={value}
                onChange={(newValue) => setValue(newValue)}
            />
        </LocalizationProvider>
      ),
      task1: <Button variant="contained">Chọn</Button>,
      task2: <Button variant="contained">Xác nhận</Button>,
    };
  }

  const rows: Data[] = [
    createData(1951060000, "Phạm Tuyết Anh", 8.5, "ABC1234", "Khoa ABC"),
  ];

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
        rowsPerPageOptions={[5, 10, 25, 100]}
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

export default observer(Student);
