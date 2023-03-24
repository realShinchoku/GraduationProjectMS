import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, MenuItem, TextField } from "@mui/material";
import { useStore } from "../../../app/stores/store";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

const bomon = [
  {
    value: "Math",
    label: "Toán cao cấp",
  },
  {
    value: "SQL",
    label: "Cơ sở dữ liệu",
  },
  {
    value: "Web",
    label: "Công nghệ Web",
  },
];

const hocvi = [
  {
    value: "TS",
    label: "Tiến sĩ",
  },
  {
    value: "THS",
    label: "Thạc sĩ",
  },
];

export default function AddLecturers() {
  const { modalStore, snackBarStore } = useStore();

  return (
    <Grid
      className="add_lecturer"
      sx={{
        width: "-webkit-fill-available",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: "10px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ marginBottom: "25px", fontSize: "2rem" }}>
          {" "}
          Thêm Giảng Viên
        </Typography>
        <Button
          sx={{ position: "absolute", right: "0",':hover': {border: 'none', background: 'none'} }}
          startIcon={<CloseIcon />}
          onClick={modalStore.closeModal}
        ></Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              label="Tên giảng viên"
              id="outlined-size-small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-select-currency"
              select
              label="Bộ môn"
              fullWidth
            >
              {bomon.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" id="outlined-size-small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-select-currency"
              select
              label="Học vị"
              fullWidth
            >
              {hocvi.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số điện thoại"
              id="outlined-size-small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "right", marginTop: "30px" }}
      >
        <LoadingButton
          sx={{
            marginRight: "20px",
            width: "90px",
            textTransform: "capitalize",
          }}
          variant="contained"
          onClick={() => snackBarStore.success("Lưu thành công")}
        >
          Lưu
        </LoadingButton>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          onClick={modalStore.closeModal}
        >
          Thoát
        </Button>
      </Box>
    </Grid>
  );
}
