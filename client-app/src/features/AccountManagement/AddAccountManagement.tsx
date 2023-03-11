import "./AccountManagement.scss"
import {Box, Button, ButtonGroup, Grid, Typography} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {useDropzone} from 'react-dropzone';
import {useStore} from "../../app/stores/store";
import {useState} from "react";

export default function AddAccountManagement() {

    const [file, setFile] = useState<any>();
    const {getRootProps, getInputProps, acceptedFiles, isDragActive, isDragAccept, isDragReject} = useDropzone({
        accept: {
            'text/csv': ['.csv',]
        },
        maxFiles: 1,
        onDrop: (files) => {
            console.log(files)
            setFile(files[0]);
        },
    });

    const {modalStore} = useStore();
    return (
        <Grid className='add_account'>
            <Grid className="modal_body">
                <Box className="title_account">
                    <Typography className="title_account_" variant="h5" gutterBottom>
                        Thêm Tài Khoản
                    </Typography>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                    <Box className="select_user">
                        <Box marginTop={'50%'} gridColumn="span 2">
                            <Box className="select_user_" sx={{display: 'flex', '& > *': {m: 1,}}}>
                                <ButtonGroup sx={{margin: 'auto', borderRadius: 'unset'}} fullWidth
                                             orientation="vertical" aria-label="vertical outlined button group"
                                             variant="outlined">
                                    <Button className="button_add_account" key="one">Sinh Viên</Button>
                                    <Button className="button_add_account" key="two">Giảng Viên</Button>
                                    <Button className="button_add_account" key="three">Bộ Môn</Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{height: 'fit-content',}} gridColumn="span 11">
                        <Box className="top_dropzone">
                            <Typography className="title_top_dropzone" variant="h6" color="inherit" component="div">
                                Tải File lên
                            </Typography>
                            <Button className="button_up_file" variant="contained" onClick={() => console.log(file)}>Tải
                                lên</Button>
                        </Box>
                        <Box {...getRootProps({className: 'container_dropzone'})}>
                            <UploadFileIcon className="icon_dropzone"/>
                            <input {...getInputProps()} />
                        </Box>
                        {file && <Box>{/* preview icon css lai cho giong ben kia*/}
                            Icon csv o day
                            <div className={"doan ten csv"}>{file.name}</div>
                            <Button className={"icon xoa"} onClick={() => acceptedFiles.slice(0)}/>
                        </Box>}
                    </Box>
                    <Box className="button_exit">
                        <Button className="button_exit_dropzone" variant="contained"
                                onClick={() => modalStore.closeModal()}>Thoát</Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}