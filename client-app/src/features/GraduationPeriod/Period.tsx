import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Period.scss"
import {useStore} from "../../app/stores/store";
import {useEffect} from "react";
import PeriodListItem from "./PeriodListItem";
import PeriodFilter from "./PeriodFilter";
import LoadingCircular from "../../app/layout/LoadingCircular";


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
                        <LoadingCircular/> :
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