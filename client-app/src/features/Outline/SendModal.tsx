import { observer } from "mobx-react-lite";
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useStore } from "../../app/stores/store";
import {useState} from "react";

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

function SendModal() {
  const {modalStore: { closeModal },} = useStore();
  const [page, setPage] = useState(1);

  const handleChange = (event : unknown, value : number) => {
    setPage(value);
    // Thực hiện callback function để load dữ liệu từ server và hiển thị lên giao diện
    // loadDataFromServer(value);
  };
  return (
    <Box className="modal_send">
      <Box className="inner">
        <Box className="close" onClick={closeModal}>
          ×
        </Box>
        <Box>
          <Typography variant="h2">
            Danh sách đề cương của sinh viên
          </Typography>
        </Box>
        <Box >
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
                    Url
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.msv}</TableCell>
                    <TableCell align="center">{row.tensv}</TableCell>
                    <TableCell align="center">{row.lop}</TableCell>
                    <TableCell align="center">{row.loaidetai}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> 
          <Pagination count={5} page={page} onChange={handleChange}/>
          </Paper>           
        </Box>
        
        <LoadingButton color="primary" className="send_btn" variant="contained" onClick={closeModal}>
          Gửi
        </LoadingButton>    
      </Box> 
    </Box>
    
  );
}

export default observer(SendModal);
