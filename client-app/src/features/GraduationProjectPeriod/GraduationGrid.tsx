import { Box, Typography } from '@mui/material';
import "./Graduation.scss"
import Grid from '@mui/material/Unstable_Grid2';

export default function GraduationProjectPeriodsGrid() {
  return (
    <Box className="graduation_Grid">
      <Grid container spacing={3}>
        <Grid xs={4} container spacing={3}>
          <Grid xs={6}>
            <Box className="boxLeft" sx={{ background: '#E3F5FF' }}>
              <Typography variant="body2" className="text">
                Sinh Viên
              </Typography>
              <Typography className="text2" >
                3,781
              </Typography>
            </Box>

          </Grid>
          <Grid xs={6} >
            <Box className="boxLeft" sx={{ background: '#3333' }}>
              <Typography variant="body2" className="text">
                Đề Cương
              </Typography>
              <Typography className="text2">
                3,219
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} >
            <Box className="boxLeft" sx={{ background: '#BBDAFA' }}>
              <Typography variant="body2" className="text" >
                Giảng viên hướng dẫn
              </Typography>
              <Typography className="text2" >
                695
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} >
            <Box className="boxLeft" sx={{ background: '#E5ECF6' }}>
              <Typography variant="body2" className="text" >
                Lớp quản lí
              </Typography>
              <Typography className="text2" >
                30
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid xs={8} container>
          <Grid xs={4}>
            <Box className="boxRight">
              <Typography variant="body2" className="text" >
                Thời Gian Liên Hệ Giảng Viên
              </Typography>
              <Typography className="text2" >
                29 Th2,2022
              </Typography>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box className="boxRight">
              <Typography variant="body2" className="text" >
                Thời Gian Đăng Ký Đề Tài
              </Typography>
              <Typography className="text2" >
                29 Th2,2022
              </Typography>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box className="boxRight">
              <Typography variant="body2" className="text" >
                Thời Gian Nộp Đề Cương
              </Typography>
              <Typography className="text2" >
                29 Th2,2022
              </Typography>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box className="boxRight">
              <Typography variant="body2" className="text" >
                Thời Gian Duyệt Đề cương
              </Typography>
              <Typography className="text2" >
                29 Th2,2022
              </Typography>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box className="boxRight">
              <Typography variant="body2" className="text" >
                Thời Gian Làm Đồ Án
              </Typography>
              <Typography className="text2" >
                29 Th2,2022
              </Typography>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box className="boxRight">
              <Typography variant="body2" className="text" >
                Thời Gian Bảo Vệ
              </Typography>
              <Typography className="text2" >
                29 Th2,2022
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

