import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import {IconButton, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import PeriodModal from "./PeriodModal";
import {useStore} from "../../app/stores/store";
import React, {useState} from "react";

function PeriodFilter() {
    const {modalStore, periodStore: {setPredicate, loading}} = useStore();
    const [keyword, setKeyword] = useState('');


    return (
        <React.Fragment>
            <Box className="btn">
                <Box className="search">
                    <TextField
                        className="search_"
                        fullWidth
                        variant="outlined"
                        placeholder="Tìm đợt đồ án..."
                        InputProps={{
                            startAdornment: (
                                <IconButton onClick={() => setPredicate('Keyword', keyword)}>
                                    <SearchOutlined/>
                                </IconButton>
                            ),
                        }}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter')
                                setPredicate('Keyword', keyword)
                        }}
                        disabled={loading}
                    />
                    <Button variant="outlined" startIcon={<AddIcon/>}
                            onClick={() => modalStore.openModal(<PeriodModal/>)}>
                        Thêm mới
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default observer(PeriodFilter);