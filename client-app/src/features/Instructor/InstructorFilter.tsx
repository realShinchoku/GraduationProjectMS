import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import {IconButton, TextField} from "@mui/material";
import {ExpandMoreSharp, SearchOutlined} from "@mui/icons-material";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {useStore} from "../../app/stores/store";

function InstructorFilter() {

    const {
        periodStore: {setPredicate, removePredicate, loading},
        filterItemsStore: {setCourse, courses, getCourses, phases, getPhases}
    } = useStore();

    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        if (courses.length <= 0)
            getCourses();
        if (phases.length <= 0)
            getPhases();
    }, [courses.length, getCourses, phases.length, getPhases]);

    return (
        <Box className="btn" sx={{marginTop: '40px'}}>
            <Box className="btn_item">
                <Autocomplete
                    className="btn_complete"
                    disablePortal
                    options={courses}
                    getOptionLabel={option => "K" + option}
                    style={{width: 130, marginRight: 10}}
                    renderInput={(params) => <TextField {...params} label={"Khóa"}/>}
                    onChange={(event, value) => {
                        if (value)
                            setPredicate('course', value);
                        else
                            removePredicate('course');
                        setCourse(value)
                    }}
                    popupIcon={<ExpandMoreSharp/>}
                    disabled={loading}
                />
                <Autocomplete
                    className="btn_complete"
                    disablePortal
                    options={phases}
                    getOptionLabel={option => "Đợt " + option}
                    style={{width: 130, marginRight: 10}}
                    renderInput={(params) => <TextField {...params} label={"Đợt"}/>}
                    onChange={(event, value) => {
                        if (value)
                            setPredicate('phase', value);
                        else
                            removePredicate('phase');
                    }}
                    popupIcon={<ExpandMoreSharp/>}
                    disabled={loading}
                />
            </Box>
            <TextField
                className="search"
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
        </Box>
    )
}

export default observer(InstructorFilter)