import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, IconButton, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import "./AccountLecturers.scss"
import AccountLecturerTable from "./AccountLecturerTable";
import {useEffect, useState} from "react";
import { useStore } from "../../../app/stores/store";
import AddLecturer from "./AddLecturer";


function AccountLecturer() {
    const {lecturerStore: {lecturers, loadLecturers, setPredicate, loading}, modalStore} = useStore();
    
    useEffect(() => {
        if (lecturers.size <= 0) loadLecturers();
    }, [loadLecturers, lecturers.size]);
    const [keyword, setKeyword] = useState<string>('');
    
    return (
        <Box className={`account_lecturers`}>
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
                                placeholder="Tìm giảng viên"
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
                            <Button color="inherit" variant="outlined" className="button_" endIcon={<AddIcon/>}
                            onClick={() => modalStore.openModal(<AddLecturer/>)}>Thêm mới</Button>
                        </Box>
                    </Box>
                    <AccountLecturerTable/>
                </Box>
            </Box>
        </Box>
    )
}

export default observer(AccountLecturer);