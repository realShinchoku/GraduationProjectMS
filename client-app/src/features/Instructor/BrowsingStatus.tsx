import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Radio, Stack, TextField} from '@mui/material';
import {useStore} from '../../app/stores/store';
import UpdateSuccess from './UpdateSuccess';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 586,
    height: 414,
    bgColor: 'background.paper',
    boxShadow: 24,
    p: 4,
    padding: '35px 44px',
};

export default function BrowsingStatus() {
    const {modalStore} = useStore();

    return (
        <Box className='browsing_status_box' sx={style}>
            <FormControl className=''>
                <FormLabel id="controlled-radio-buttons-group" sx={{marginBottom: '15px'}}>Trạng thái duyệt</FormLabel>
                <RadioGroup
                    aria-labelledby="controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    sx={{marginLeft: '75px'}}
                >
                    <FormControlLabel className='chose' sx={{"& span": {fontSize: '24px'}}} value="yes"
                                      control={<Radio/>} label="Đồng ý"/>
                    <FormControlLabel className='chose' sx={{"& span": {fontSize: '24px'}}} value="no"
                                      control={<Radio/>} label="Không đồng ý"/>
                </RadioGroup>
            </FormControl>
            <Typography id="modal-modal-description" sx={{"& fieldset": {fontSize: '24px'}, mt: 2}}>
                <TextField sx={{"& label": {fontSize: '24px'}, width: '400px', height: '50px', marginLeft: '30px'}}
                           name='note' label="Ghi chú" focused id="filled-size-normal"/>
            </Typography>
            <Stack sx={{marginTop: '90px', display: 'block',}} direction="row" spacing={8} display={'flex'}
                   textAlign={'center'}>
                <Button sx={{
                    textTransform: 'capitalize',
                    width: '144px',
                    height: '54px',
                    fontSize: '24px',
                    borderRadius: '8px'
                }} variant="contained" type='submit' onClick={() => modalStore.openModal(<UpdateSuccess/>)}>
                    Xác nhận
                </Button>
                <Button sx={{
                    textTransform: 'capitalize',
                    width: '144px',
                    height: '54px',
                    fontSize: '24px',
                    borderRadius: '8px'
                }} variant="outlined" onClick={() => modalStore.closeModal()}>
                    Thoát
                </Button>
            </Stack>
        </Box>
    );
}