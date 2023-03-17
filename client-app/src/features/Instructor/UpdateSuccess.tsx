import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useStore} from '../../app/stores/store';
import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgColor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 8,
};

export default function UpdateSuccess() {
    const {modalStore} = useStore();
    return (
        <div>
            <Box sx={style}>
                <Typography sx={{
                    alignItems: 'center',
                    display: 'flex',
                    textAlign: 'center',
                    justifyContent: 'center',
                    padding: '40px',
                    margin: 'auto',
                    whiteSpace: 'nowrap'
                }} variant="h4" component="h1">
                    Cập nhật thành công!
                </Typography>
                <Button sx={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    border: 'none',
                    marginTop: '10px',
                    ':hover': {border: 'none', background: 'none'}
                }} variant="outlined"
                        startIcon={<CloseIcon sx={{'&:nth-of-type(1)': {fontSize: '30px'}, color: '#333'}}/>}
                        onClick={() => modalStore.closeModal()}></Button>
            </Box>
        </div>
    );
}