import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';

export default function SelectLabels(props: any) {
    const [select, setSelect] = React.useState('1');
        
    const handleChange = (event: SelectChangeEvent) => {
        setSelect(event.target.value);
    };

    return (
        <>
            {(props.props === 'status')&&(
                <Box>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                        value={select}
                        onChange={handleChange}
                        >
                        <MenuItem value={1}>Trạng thái</MenuItem>
                        <MenuItem value={2}>Tiếp nhận</MenuItem>
                        <MenuItem value={3}>Chờ duyệt</MenuItem>
                        <MenuItem value={4}>Từ chối</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            )}
            {(props.props === 'department')&&(
                <Box>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                        value={select}
                        onChange={handleChange}
                        >
                        <MenuItem value={1}>Khoa</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            )}
            {(props.props === 'subject')&&(
                <Box>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                        value={select}
                        onChange={handleChange}
                        >
                        <MenuItem value={1}>Bộ môn</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            )}
        </>
    );
}