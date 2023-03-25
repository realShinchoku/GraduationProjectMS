import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton';
import {Card} from "@mui/material";
import {useEffect} from "react";
import {useStore} from "../../app/stores/store";
import PeriodListItem from "./PeriodListItem";
import PeriodFilter from "./PeriodFilter";
import "./Period.scss"

function Period() {

    const {periodStore: {periods, loadLists, periodsList, loading}} = useStore();
    useEffect(() => {
        if (periods.size <= 0) loadLists();
    }, [loadLists, periods.size]);

    return (
        <Box className={'graduation'}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Đợt Đồ Án</Typography>
                    <PeriodFilter/>
                    {loading ?
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
                        :
                        <>
                            {periodsList.map(period => <PeriodListItem key={period.id} period={period}/>)}
                        </>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default observer(Period);