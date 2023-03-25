import {AppBar, Box, IconButton, Tab, Tabs, TextField} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import {SearchOutlined} from "@mui/icons-material";
import React, {useState} from "react";
import {TabContext, TabPanel} from "@mui/lab";
import {useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";
import InstructorApprovalTable from "./InstructorApprovalTable";
import InstructorAssginTable from "./InstructorAssginTable";

interface Props {
    periodId: string
}

function InstructorTableRow({periodId}: Props) {
    const theme = useTheme();
    const [value, setValue] = React.useState('0');
    const [keyword, setKeyword] = useState<string>('');

    const {periodStore: {instructorStores, studentStores, loading}} = useStore();
    const instructorStore = instructorStores.get(periodId)!;
    const studentStore = studentStores.get(periodId)!;

    const handleChange = async (event: unknown, newValue: string) => {
        setValue(newValue);
        setKeyword('');
        if (newValue === '0') {
            instructorStore.removePredicate(keyword);
            await instructorStore.loadLists()
        } else if (newValue === '1') {
            studentStore.removePredicate(keyword);
            await studentStore.loadLists();
        }
    };

    if (loading)
        return <></>

    return (
        <Box className="account_table_list">
            <TabContext value={value}>
                <Box className="detail_account">
                    <Box className="select_user">
                        <AppBar sx={{background: '#fffefe', boxShadow: 'none'}} position="static" color="default">
                            <Tabs className="tab_account"
                                  value={value}
                                  onChange={handleChange}
                                  indicatorColor="primary"
                                  textColor="inherit"
                                  variant="fullWidth"
                                  aria-label="action tabs example"
                            >
                                <Tab className="tab_account" label="Đã Đăng Ký" value={'0'}/>
                                <Tab className="tab_account" label="Chưa đăng Ký" value={'1'}/>
                            </Tabs>
                        </AppBar>
                    </Box>
                    <TextField
                        className="search_account"
                        fullWidth
                        size="small"
                        id="standard-bare"
                        variant="outlined"
                        placeholder="Tìm kiếm..."
                        InputProps={{
                            startAdornment: (
                                <IconButton onClick={() => {
                                    if (value === '0')
                                        instructorStore.setPredicate('Keyword', keyword);
                                    else if (value === '1')
                                        studentStore.setPredicate('Keyword', keyword);
                                }}>
                                    <SearchOutlined/>
                                </IconButton>
                            ),
                        }}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter')
                                if (value === '0')
                                    instructorStore.setPredicate('Keyword', keyword)
                                else if (value === '1')
                                    studentStore.setPredicate('Keyword', keyword);
                        }}
                        disabled={instructorStore.loading || studentStore.loading}
                    />
                </Box>
                <TabPanel value={'0'} dir={theme.direction}>
                    {value === '0' && <InstructorApprovalTable periodId={periodId}/>}
                </TabPanel>
                <TabPanel value={'1'} dir={theme.direction}>
                    {value === '1' && <InstructorAssginTable periodId={periodId}/>}
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default observer(InstructorTableRow);