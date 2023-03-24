import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, TextField } from "@mui/material";
import { useStore } from "../../../app/stores/store";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";


export default function AddSubject() {
  const { modalStore,snackBarStore} = useStore();

  return (
    <Grid
      className="add_subject"
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
          Thêm Bộ Môn
        </Typography>
        <Button
          sx={{ position: "absolute", right: "0",':hover': {border: 'none', background: 'none'} }}
          startIcon={<CloseIcon />}
          onClick={modalStore.closeModal}
        ></Button>
      </Box>{" "}
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField label="Tên bộ môn" id="outlined-size-small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" id="outlined-size-small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Mã bộ môn" id="outlined-size-small" fullWidth />
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
          sx={{ marginRight: "20px", width: "90px" }}
          variant="contained"
          onClick={() => snackBarStore.success("Lưu thành công")}
        >
          Lưu
        </LoadingButton>
        <Button variant="contained" onClick={modalStore.closeModal}>
          Thoát
        </Button>
      </Box>
    </Grid>
  );
}
