import {Box, IconButton, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import React, {useState} from "react";
import "./AccountManagement.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import AccountStudentTable from "./AccountStudentTable";

interface Props {
    periodId: string;
}

function AccountStudentListItemDetail({periodId}: Props) {
    const {periodStore: {studentStores, loading}} = useStore();
    const studentStore = studentStores.get(periodId)!;
    const [keyword, setKeyword] = useState<string>('');

    return (
        <Box className="account_table_list">
            <TextField
                className="search_account"
                fullWidth
                size="small"
                id="standard-bare"
                variant="outlined"
                placeholder="Tìm kiếm..."
                InputProps={{
                    startAdornment: (
                        <IconButton onClick={() => studentStore.setPredicate('Keyword', keyword)}>
                            <SearchOutlined/>
                        </IconButton>
                    ),
                }}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter')
                        studentStore.setPredicate('Keyword', keyword);
                }}
                disabled={studentStore.loading}
            />
            <AccountStudentTable studentStore={studentStore}/>
        </Box>
    );
}

export default observer(AccountStudentListItemDetail);