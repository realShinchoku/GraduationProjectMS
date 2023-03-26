import Box from "@mui/material/Box";
import {Card} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function PeriodSkeleton() {
    return (
        <Box>
            <Card sx={{
                background: '#F7F9FB',
                borderRadius: '16px',
                boxShadow: 'none',
                padding: '44px 36px',
                marginTop: '10px'
            }}>
                <Skeleton animation="wave" width={100} height={40} sx={{marginBottom: '15px'}}/>
                <Box className="period">
                    <Box className="period_skeleton">
                        <Box className="period_skeleton_">
                            <Skeleton animation="wave" width="80%" height={28}/>
                            <Skeleton animation="wave" width="80%" height={28}/>
                        </Box>
                        <Box className="period_skeleton_">
                            <Skeleton animation="wave" width="80%" height={28}/>
                            <Skeleton animation="wave" width="80%" height={28}/>
                        </Box>
                        <Box className="period_skeleton_">
                            <Skeleton animation="wave" width="80%" height={28}/>
                            <Skeleton animation="wave" width="80%" height={28}/>
                        </Box>
                    </Box>
                    <Skeleton animation="wave" width={100} height={40}/>
                </Box>
            </Card>
            <Card sx={{
                background: '#F7F9FB',
                borderRadius: '16px',
                boxShadow: 'none',
                padding: '44px 36px',
                marginTop: '10px'
            }}>
                <Skeleton animation="wave" width={100} height={40} sx={{marginBottom: '15px'}}/>
                <Box className="period">
                    <Box className="period_skeleton">
                        <Box className="period_skeleton_">
                            <Skeleton animation="wave" width="80%" height={28}/>
                            <Skeleton animation="wave" width="80%" height={28}/>
                        </Box>
                        <Box className="period_skeleton_">
                            <Skeleton animation="wave" width="80%" height={28}/>
                            <Skeleton animation="wave" width="80%" height={28}/>
                        </Box>
                        <Box className="period_skeleton_">
                            <Skeleton animation="wave" width="80%" height={28}/>
                            <Skeleton animation="wave" width="80%" height={28}/>
                        </Box>
                    </Box>
                    <Skeleton animation="wave" width={100} height={40}/>
                </Box>
            </Card>
        </Box>
    )
}