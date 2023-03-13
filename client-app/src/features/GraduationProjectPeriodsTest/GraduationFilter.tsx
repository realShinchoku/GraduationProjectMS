import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import {IconButton, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import AutoComplete from "../../app/common/AutoComplete/AutoComplete";
import React from "react";

function GraduationProjectPeriodsListFilter() {
    const [open, setOpen] = React.useState(false);
    const complete1 = [
        {label: 'Khóa 1'},
        {label: 'Khóa 2'},
        {label: 'Khóa 3'},
    ];
    const complete3 = [
        {label: 'Bo mon 1'},
        {label: 'Bo mon 2'},
        {label: 'Bo mon 3'},
    ];
    
    return (
        <React.Fragment>
            <Box className="btn">
            <Box className="btn_item">
                <AutoComplete options={complete1} label={"Khóa"}/>
                <AutoComplete options={complete3} label={"Bộ môn"}/>
            </Box>
            <Box className="search">
                <TextField
                    className="search_"
                    fullWidth
                    variant="outlined"
                    placeholder="Tìm đợt đồ án..."
                    InputProps={{
                        startAdornment: (
                            <IconButton>
                                <SearchOutlined/>
                            </IconButton>
                        ),
                    }}
                />
              
                <Button variant="outlined" startIcon={<AddIcon/>} onClick={() => setOpen(!open)}>
                    Thêm mới
                </Button>
            </Box>
            </Box>
            {/* <GraduationAdd value={open}/> */}
        </React.Fragment>
        
        
    )
}

export default observer(GraduationProjectPeriodsListFilter);