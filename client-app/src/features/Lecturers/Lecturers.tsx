import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useOutletContext} from "react-router-dom";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Button from '@mui/material/Button';
import {IconButton, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import Autocomplete from '@mui/material/Autocomplete';

import LecturersTable from "./LecturersTable";
import {useStore} from "../../app/stores/store";
import "./lecturers.scss"

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

const complete1 = [
    {label: 'Tiếp nhận'},
    {label: 'Chờ Duyệt'},
    {label: 'Từ Chối'},
];
const complete2 = [
    {label: 'Tiếp nhận'},
    {label: 'Chờ Duyệt'},
    {label: 'Từ Chối'},
];
const complete3 = [
    {label: 'Tiếp nhận'},
    {label: 'Chờ Duyệt'},
    {label: 'Từ Chối'},
];

function HomePageTest() {
    const value = useOutletContext();

    const {
        commonStore: {isActive}
    } = useStore();

    return (
        <Box className={`homepage_test ${isActive}`}>
            <Box className="inner">
                <TabPanel value={value} index={0}>
                    <Box className="nav">
                        <Typography variant="h3">Giảng Viên</Typography>
                        <Box className="btn">
                            <Box className="btn_item">
                                <Autocomplete
                                    className="btn_complete"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={complete1}
                                    style={{width: 130, marginRight: 10}}
                                    renderInput={(params) => <TextField {...params} label="Trạng Thái"/>}
                                />
                                <Autocomplete
                                    className="btn_complete"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={complete2}
                                    style={{width: 130, marginRight: 10}}
                                    renderInput={(params) => <TextField {...params} label="Khoa"/>}
                                />
                                <Autocomplete
                                    className="btn_complete"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={complete3}
                                    style={{width: 130}}
                                    renderInput={(params) => <TextField {...params} label="Bộ Môn"/>}
                                />
                            </Box>
                            <Box className="search">
                                <TextField
                                    className="search_"
                                    fullWidth
                                    id="standard-bare"
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
                        <Box>
                            <LecturersTable/>
                        </Box>
                    </Box>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>

                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>
        </Box>
    )
}

export default observer(HomePageTest);