import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import {IconButton, TextField} from "@mui/material";
import {ExpandMoreSharp, SearchOutlined} from "@mui/icons-material";
import Button from "@mui/material/Button";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import {useStore} from "../../../app/stores/store";
import {useEffect, useRef, useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";

function LecturerListFilter() {

    const lecturerStatus = [
        {id: 0, label: 'Tiếp nhận'},
        {id: 1, label: 'Chờ Duyệt'},
        {id: 2, label: 'Từ Chối'},
    ];
    const {
        departmentSubjectStore: {getFilterItem, departmentSubjectFilterItems},
        lecturerStore: {setPredicate, removePredicate, loading, resetPredicate}
    } = useStore();

    useEffect(() => {
        if (departmentSubjectFilterItems.length <= 0)
            getFilterItem();
    }, [departmentSubjectFilterItems.length, getFilterItem]);
    const [keyword, setKeyword] = useState<string>('');

    return (
        <Box className="btn">
            <Box className="btn_item">
                <Autocomplete
                    className="btn_complete"
                    disablePortal
                    options={lecturerStatus}
                    getOptionLabel={option => option.label}
                    style={{width: 130, marginRight: 10}}
                    renderInput={(params) => <TextField {...params} label={"Trạng thái"}/>}
                    onChange={(event, value) => {
                        if (value)
                            setPredicate('status', value!.id);
                        else
                            removePredicate('status');
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    popupIcon={<ExpandMoreSharp/>}
                    disabled={loading}
                />
                <Autocomplete
                    className="btn_complete"
                    disablePortal
                    options={departmentSubjectFilterItems}
                    getOptionLabel={option => option.displayName}
                    style={{width: 130, marginRight: 10}}
                    renderInput={(params) => <TextField {...params} label={"Bộ môn"}/>}
                    onChange={(event, value) => {
                        if (value)
                            setPredicate('departmentSubjectId', value!.id);
                        else
                            removePredicate('departmentSubjectId');
                    }}
                    popupIcon={<ExpandMoreSharp/>}
                    disabled={loading}
                />
            </Box>
            <Box className="search">
                <TextField
                    className="search_"
                    fullWidth
                    variant="outlined"
                    placeholder="Tìm tên giảng viên..."
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
                <Button variant="outlined" onClick={() => {
                    setKeyword('');
                    resetPredicate();
                }} startIcon={<ImportExportIcon/>}>
                    Làm Mới
                </Button>
            </Box>
        </Box>
    )
}

export default observer(LecturerListFilter);