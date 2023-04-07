import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import {IconButton, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import {useStore} from "../../app/stores/store";
import React, {useState} from "react";
import AutoComplete from "../../app/common/AutoComplete/AutoComplete";

function OutlineFilter() {
    const {periodStore: {setPredicate, loading},} = useStore();
    const [keyword, setKeyword] = useState("");
    const complete1 = [
        {label: "Khóa 1"},
        {label: "Khóa 2"},
        {label: "Khóa 3"},
    ];
    const complete2 = [
        {label: "Đợt 1"},
        {label: "Đợt 2"},
        {label: "Đợt 3"},
    ];

    return (
        <React.Fragment>
            <Box className="btn">
                <Box className="btn_item">
                    <AutoComplete options={complete1} label={"Khóa"}/>
                    <AutoComplete options={complete2} label={"Đợt"}/>
                </Box>
                <Box className="search">
                    <TextField
                        className="search_"
                        fullWidth
                        variant="outlined"
                        placeholder="Tìm đợt đồ án..."
                        InputProps={{
                            startAdornment: (
                                <IconButton onClick={() => setPredicate("Keyword", keyword)}>
                                    <SearchOutlined/>
                                </IconButton>
                            ),
                        }}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") setPredicate("Keyword", keyword);
                        }}
                        disabled={loading}
                    />
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default observer(OutlineFilter);
