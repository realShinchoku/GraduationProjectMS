import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, IconButton, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import "./DepartmentSubject.scss"
import AccountSubjectList from "./DepartmentSubjectList";
import AddSubject from "./AddDepartmentSubject";
import {useStore} from "../../../app/stores/store";


function AccountSubject() {
    const {modalStore} = useStore();

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
                                        <IconButton>
                                            <SearchOutlined/>
                                        </IconButton>
                                    ),
                                }}
                            />
                            <Button color="inherit" variant="outlined" className="button_" startIcon={<AddIcon/>}
                                    onClick={() => modalStore.openModal(<AddSubject/>)}>Thêm mới</Button>
                        </Box>
                    </Box>
                    <Box>
                        {<AccountSubjectList/>}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default observer(AccountSubject);