import "./AccountManagement.scss"
import {  Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {useDropzone} from 'react-dropzone';
import { useState } from "react";

const buttons = [
    <Button className="button_add_account" key="one">Sinh Viên</Button>,
    <Button className="button_add_account"  key="two">Giảng Viên</Button>,
    <Button className="button_add_account"  key="three">Bộ Môn</Button>,
  ];
export default function AddAccountManagement() {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone({
        accept: {
          'text/csv': ['.csv',]
        }
      });
      const [showBox, setShowBox] = useState(true)
  return (
    <div>
        {showBox ? <div>
    <Grid className='add_account'>
        <Grid className="modal_add_account"></Grid>
        <Grid className="modal_body">
            <Box>
                <Typography className="title_account" variant="h5" gutterBottom>
                    Thêm Tài Khoản
                </Typography>
                </Box>
                <Box>
                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                        <Box className="select_user">
                            <Box marginTop={'50%'} gridColumn="span 2">
                                <Box className="select_user_" sx={{display: 'flex','& > *': {m: 1,}}}>
                                    <ButtonGroup sx={{margin:'auto',borderRadius:'unset'}} fullWidth orientation="vertical" aria-label="vertical outlined button group" variant="outlined">
                                        {buttons}
                                    </ButtonGroup>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{height:'fit-content',}} gridColumn="span 11">
                            <Box className="top_dropzone">
                                <Typography className="title_top_dropzone"  variant="h6" color="inherit" component="div">
                                    Tải File lên
                                </Typography>
                                <Button className="button_up_file" variant="contained">Tải lên</Button>
                            </Box>
                            <Box className="container_dropzone">
                                <Box>
                                    <Box>
                                        <UploadFileIcon className="icon_dropzone"></UploadFileIcon>
                                    </Box>
                                    <Box {...getRootProps({className: 'dropzone'})}>
                                        <input {...getInputProps()} />
                                        {isDragAccept && (<Typography className="typo_notification">All files will be accepted</Typography>)}
                                        {isDragReject && (<Typography className="typo_notification">Some files will be rejected</Typography>)}
                                        {!isDragActive && (<Typography className="typo_notification">Drop some files or click here</Typography>)}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="button_exit" sx={{position:'absolute', right:'0',left:'0',bottom:'0',display:'flex',justifyContent:'center', marginBottom:'30px',marginLeft:'160px'}}>
                        <Button className="button_exit_dropzone" variant="contained" disabled={!showBox} onClick={() => setShowBox(false)}>Thoát</Button>
                        </Box>
                    </Box>
                </Box>
        </Grid>
    </Grid>
        </div> : null}
    </div>
  );
}