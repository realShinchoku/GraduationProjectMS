import {Box, Typography} from '@mui/material';
import "./Period.scss"
import Grid from '@mui/material/Unstable_Grid2';
import {Period} from "../../app/models/period";
import {format} from "date-fns";

interface Props {
    period: Period;
}

export default function PeriodItemDetail({period}: Props) {
    return (
        <Box className="graduation_Grid">
            <Grid container spacing={2}>
                <Grid xs={4} container>
                    <Grid xs={6}>
                        <Box className="boxLeft" sx={{background: '#E3F5FF'}}>
                            <Typography variant="body2" className="text">
                                Sinh Viên
                            </Typography>
                            <Typography className="text2">
                                {period.studentsCount}
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid xs={6}>
                        <Box className="boxLeft" sx={{background: '#3333'}}>
                            <Typography variant="body2" className="text">
                                Đề Cương
                            </Typography>
                            <Typography className="text2">
                                {period.syllabiCount}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={6}>
                        <Box className="boxLeft" sx={{background: '#BBDAFA'}}>
                            <Typography variant="body2" className="text">
                                Giảng viên hướng dẫn
                            </Typography>
                            <Typography className="text2">
                                {period.lecturersCount}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={6}>
                        <Box className="boxLeft" sx={{background: '#E5ECF6'}}>
                            <Typography variant="body2" className="text">
                                Lớp quản lí
                            </Typography>
                            <Typography className="text2">
                                {period.classesCount}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Grid xs={8} container>
                    <Grid xs={4}>
                        <Box className="boxRight">
                            <Typography variant="body2" className="text">
                                Thời Gian Liên Hệ Giảng Viên
                            </Typography>
                            <Typography className="text2">
                                {format(new Date(period.contactInstructorTime), "dd 'Th'M',' yyyy")}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={4}>
                        <Box className="boxRight">
                            <Typography variant="body2" className="text">
                                Thời Gian Đăng Ký Đề Tài
                            </Typography>
                            <Typography className="text2">
                                {format(new Date(period.registerTopicTime), "dd 'Th'M',' yyyy")}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={4}>
                        <Box className="boxRight">
                            <Typography variant="body2" className="text">
                                Thời Gian Nộp Đề Cương
                            </Typography>
                            <Typography className="text2">
                                {format(new Date(period.syllabusSubmissionTime), "dd 'Th'M',' yyyy")}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={4}>
                        <Box className="boxRight">
                            <Typography variant="body2" className="text">
                                Thời Gian Duyệt Đề cương
                            </Typography>
                            <Typography className="text2">
                                {format(new Date(period.syllabusReviewTime), "dd 'Th'M',' yyyy")}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={4}>
                        <Box className="boxRight">
                            <Typography variant="body2" className="text">
                                Thời Gian Làm Đồ Án
                            </Typography>
                            <Typography className="text2">
                                {format(new Date(period.graduationProjectTime), "dd 'Th'M',' yyyy")}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={4}>
                        <Box className="boxRight">
                            <Typography variant="body2" className="text">
                                Thời Gian Bảo Vệ
                            </Typography>
                            <Typography className="text2">
                                {format(new Date(period.protectionTime), "dd 'Th'M',' yyyy")}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}