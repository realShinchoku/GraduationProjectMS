import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "./AccountManagement.scss"

function createData(
  stt: number,
  msv: number,
  name: string,
  classroom: string,
  khoa: string,
  date: string,
  email: string,
) {
  return { stt, msv, name, classroom, khoa, date, email};
}

const rows = [
  createData(1, 1951060909, 'Nguyễn Thị Phương Thảo', '61THNB','CNTT','03/03/2001','1951060919@e.tlu.edu.vn'),
  createData(2, 1951060909, 'Nguyễn Thị Phương Thảo', '61THNB','CNTT','03/03/2001','1951060919@e.tlu.edu.vn'),
  createData(3, 1951060909, 'Nguyễn Thị Phương Thảo', '61THNB','CNTT','03/03/2001','1951060919@e.tlu.edu.vn'),
  createData(4, 1951060909, 'Nguyễn Thị Phương Thảo', '61THNB','CNTT','03/03/2001','1951060919@e.tlu.edu.vn'),
  createData(5, 1951060909, 'Nguyễn Thị Phương Thảo', '61THNB','CNTT','03/03/2001','1951060919@e.tlu.edu.vn'),
  createData(6, 1951060909, 'Nguyễn Thị Phương Thảo', '61THNB','CNTT','03/03/2001','1951060919@e.tlu.edu.vn'),
  createData(7, 1951060909, 'Nguyễn Thị Phương Thảo', '61THNB','CNTT','03/03/2001','1951060919@e.tlu.edu.vn'),
];

export default function AccountManagementTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow:'none'}}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell className='color_background' align="left">STT</TableCell>
                <TableCell className='color_background' align="left">Mã Sinh viên</TableCell>
                <TableCell className='color_background' align="left">Tên Sinh Viên</TableCell>
                <TableCell className='color_background' align="left">Lớp</TableCell>
                <TableCell className='color_background' align="left">Khoa</TableCell>
                <TableCell className='color_background' align="left">Ngày Tạo</TableCell>
                <TableCell className='color_background' align="left">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.stt}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.stt}
                  </TableCell>
                  <TableCell align="left">{row.msv}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.classroom}</TableCell>
                  <TableCell align="left">{row.khoa}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
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
  );
}