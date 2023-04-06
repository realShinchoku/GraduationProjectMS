import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {useStore} from "../../app/stores/store";
import ApprovalFilter from "./ApprovalFilter";
import ApprovalListItem from "./ApprovalListItem";
import "./Approval.scss"
import {PagingParams} from "../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ApprovalSkeleton from "./ApprovalSkeleton";

function Approval() {
    const {periodStore: {periods, loadList, periodsList, loading, setPagingParams, pagination}} = useStore();
    const [loadingNext, setLoadingNext] = useState(false);
    useEffect(() => {
        if (pagination?.itemsPerPage !== 4)
            setPagingParams(new PagingParams(0, 4))
        if (periods.size <= 1) loadList();
    }, [loadList, periods.size, setPagingParams, pagination?.itemsPerPage]);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1, 2));
        loadList().then(() => setLoadingNext(false));
    }

    return (
        <Box className={'approval'}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Quản Lý Đề Tài</Typography>
                    <ApprovalFilter/>
                    <InfiniteScroll pageStart={0} loadMore={handleGetNext}
                                    hasMore={!loadingNext && !!pagination && pagination.currentPage + 1 < pagination.totalPages}
                                    initialLoad={false}>
                        {periodsList.map(period => <ApprovalListItem key={period.id} period={period}/>)}
                    </InfiniteScroll>
                    {(loading || loadingNext) && <ApprovalSkeleton/>}
                </Box>
            </Box>
        </Box>
    )
}

export default observer(Approval);
