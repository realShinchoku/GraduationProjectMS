import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Instructor.scss"
import InstructorList from "./InstructorList";
import {useStore} from "../../app/stores/store";
import {useEffect, useState} from "react";
import InstructorFilter from "./InstructorFilter";
import InstructorSkeleton from "./InstructorSkeleton";
import InfiniteScroll from "react-infinite-scroller";
import {PagingParams} from "../../app/models/pagination";

function Instructor() {
    const {
        periodStore: {
            loadList,
            periods,
            periodsList,
            setInstructorStatus,
            loading,
            isInstructor,
            setPagingParams,
            pagination
        }
    } = useStore();
    const [loadingNext, setLoadingNext] = useState(false);
    useEffect(() => {
        if (!isInstructor)
            setInstructorStatus();
        if (periods.size <= 0)
            loadList();
    }, [loadList, periods.size, setInstructorStatus, isInstructor]);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1, 2));
        loadList().then(() => setLoadingNext(false));
    }

    return (
        <Box className={`instructor`}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Quản Lý Đăng ký Giảng viên hướng dẫn</Typography>
                    <InstructorFilter/>
                    <InfiniteScroll pageStart={0} loadMore={handleGetNext}
                                    hasMore={!loadingNext && !!pagination && pagination.currentPage + 1 < pagination.totalPages}
                                    initialLoad={false}>
                        {periodsList.map(period =>
                            <InstructorList period={period} key={period.id}/>
                        )}
                    </InfiniteScroll>
                    {(loadingNext || loading) && <InstructorSkeleton/>}
                </Box>
            </Box>
        </Box>
    )
}

export default observer(Instructor);
