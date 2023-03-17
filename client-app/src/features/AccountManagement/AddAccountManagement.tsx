import {Box, Button, ButtonGroup, Grid, Typography} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {useDropzone} from 'react-dropzone';
import {useStore} from "../../app/stores/store";
import {useState} from "react";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function AddAccountManagement() {

    const [file, setFile] = useState<any>();
    const {getRootProps, getInputProps, acceptedFiles, isDragActive} = useDropzone({
        accept: {
            'text/csv': ['.csv',]
        },
        maxFiles: 1,
        onDrop: (files) => {
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
                            {!(isDragActive || file) &&
                                <>
                                    <UploadFileIcon className='icon_dropzone_'/>
                                    <Box className="icon_dropzone">
                                        <Typography className='typo_dropzone'>Kéo thả file vào đây để nhập thông tin.
                                            Định
                                            dạng hỗ trợ .csv</Typography>
                                    </Box>
                                </>
                            }
                            <input {...getInputProps()} />
                        </Box>
                        {file && <Box className='dropzone_file_csv'>{}
                            <Button className={"icon_delete"} onClick={() => {
                                setFile(undefined);
                                console.log(acceptedFiles);
                            }}
                                    sx={{
                                        padding: '0px 0px 2px 50px',
                                        transform: 'translateX(8px)',
                                        position: 'absolute',
                                        bottom: '0',
                                        right: '0',
                                        border: 'none',
                                        ':hover': {border: 'none', background: 'none'}
                                    }} variant="outlined" startIcon={<DeleteForeverOutlinedIcon
                                sx={{'&:nth-of-type(1)': {fontSize: '15px'}, color: '#bebebe'}}/>}
                            />
                            <DescriptionOutlinedIcon className='icon_dropFile'></DescriptionOutlinedIcon>
                            <div className={"file_name"}>{file.name}</div>
                        </Box>}
                    </Box>
                    <Box className="button_exit">
                        <Button className="button_exit_dropzone" variant="contained"
                                onClick={modalStore.closeModal}>Thoát</Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}