import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {useStore} from "../../app/stores/store";
import "./Outline.scss"
import {PagingParams} from "../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import OutlineSkeleton from "./OutlineSkeleton";
import OutlineListItem from "./OutlineListItem";
import OutlineFilter from "./OutlineFilter";


function Outline() {
    const {periodStore: {periods, loadLists, periodsList, loading, setPagingParams, pagination}} = useStore();
    const [loadingNext, setLoadingNext] = useState(false);
    useEffect(() => {
        if (pagination?.itemsPerPage !== 4)
            setPagingParams(new PagingParams(0, 4))
        if (periods.size <= 1) loadLists();
    }, [loadLists, periods.size, setPagingParams, pagination?.itemsPerPage]);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1, 2));
        loadLists().then(() => setLoadingNext(false));
    }

    return (
        <Box className={'approval'}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Quản Lý Đề Cương</Typography>
                    <OutlineFilter />
                    <InfiniteScroll pageStart={0} loadMore={handleGetNext}
                                    hasMore={!loadingNext && !!pagination && pagination.currentPage + 1 < pagination.totalPages}
                                    initialLoad={false}>
                        {periodsList.map(period => <OutlineListItem key={period.id} period={period}/>)}
                    </InfiniteScroll>
                    {(loading || loadingNext) && <OutlineSkeleton/>}
                </Box>
            </Box>
        </Box>
    )
}

export default observer(Outline);
