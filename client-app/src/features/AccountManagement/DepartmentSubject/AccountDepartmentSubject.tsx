import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, IconButton, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import "./DepartmentSubject.scss"
import {useStore} from "../../../app/stores/store";
import AccountDepartmentSubjectTable from "./AccountDepartmentSubjectTable";
import {useEffect, useState} from "react";
import AddDepartmentSubject from "./AddDepartmentSubject";


function AccountDepartmentSubject() {
    const {departmentSubjectStore: {departmentSubjects, loadItems, setPredicate, loading}, modalStore} = useStore();

    useEffect(() => {
        if (departmentSubjects.size <= 0) loadItems();
    }, [loadItems, departmentSubjects.size]);
    const [keyword, setKeyword] = useState<string>('');

    return (
        <Box className={`account_subject`}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Tài khoản</Typography>
                    <Box className="btn">
                        <Box className="search">
                            <TextField
                                className="search_"
                                fullWidth
                                id="standard-bare"
                                variant="outlined"
                                placeholder="Tìm bộ môn"
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
                            <Button color="inherit" variant="outlined" className="button_" startIcon={<AddIcon/>}
                                    onClick={() => modalStore.openModal(<AddDepartmentSubject/>)}>Thêm mới</Button>
                        </Box>
                    </Box>
                    <AccountDepartmentSubjectTable/>
                </Box>
            </Box>
        </Box>
    )
}

export default observer(AccountDepartmentSubject);