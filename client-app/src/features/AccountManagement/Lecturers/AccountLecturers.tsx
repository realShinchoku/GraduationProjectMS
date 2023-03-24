import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, IconButton, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import "./AccountLecturers.scss"
import AccountLecturersList from "./AccountLecturersList";
import { useState } from "react";
import { useStore } from "../../../app/stores/store";
import AddLecturers from "./AddLecturers";


function AccountLecturers() {

    const {modalStore} = useStore();
    
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
                                        <IconButton>
                                            <SearchOutlined/>
                                        </IconButton>
                                    ),
                                }}
                            />
                            <Button color="inherit" variant="outlined" className="button_" endIcon={<AddIcon/>}
                            onClick={() => modalStore.openModal(<AddLecturers/>)}>Thêm mới</Button>
                        </Box>
                    </Box>
                    <Box>
                        {<AccountLecturersList/>}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default observer(AccountLecturers);