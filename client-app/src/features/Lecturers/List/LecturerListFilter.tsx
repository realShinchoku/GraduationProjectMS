import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import {IconButton, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import Button from "@mui/material/Button";
import ImportExportIcon from "@mui/icons-material/ImportExport";

import AutoComplete from "../../../app/common/AutoComplete/AutoComplete";

function LecturerListFilter() {

    const complete1 = [
        {label: 'Tiếp nhận'},
        {label: 'Chờ Duyệt'},
        {label: 'Từ Chối'},
    ];
    const complete2 = [
        {label: 'Khoa 1'},
        {label: 'Khoa 2'},
        {label: 'Khoa 3'},
    ];
    const complete3 = [
        {label: 'Bo mon 1'},
        {label: 'Bo mon 2'},
        {label: 'Bo mon 3'},
    ];

    return (
        <Box className="btn">
            <Box className="btn_item">
                <AutoComplete options={complete1} label={"Trạng Thái"}/>
                <AutoComplete options={complete2} label={"Khoa"}/>
                <AutoComplete options={complete3} label={"Bộ môn"}/>
            </Box>
            <Box className="search">
                <TextField
                    className="search_"
                    fullWidth
                    variant="outlined"
                    placeholder="Tìm tên giảng viên..."
                    InputProps={{
                        startAdornment: (
                            <IconButton>
                                <SearchOutlined/>
                            </IconButton>
                        ),
                    }}
                />
                <Button variant="outlined" startIcon={<ImportExportIcon/>}>
                    Làm Mới
                </Button>
            </Box>
        </Box>
    )
}

export default observer(LecturerListFilter);