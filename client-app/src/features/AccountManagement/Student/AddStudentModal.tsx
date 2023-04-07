import {Box, Button, Grid, Typography} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {useDropzone} from 'react-dropzone';
import {store, useStore} from "../../../app/stores/store";
import {useState} from "react";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {observer} from "mobx-react-lite";
import {LoadingButton} from "@mui/lab";

interface Props {
    periodId: string;
}

function AddStudentModal({periodId}: Props) {

    const [file, setFile] = useState<any>();
    const {getRootProps, getInputProps, acceptedFiles, isDragActive} = useDropzone({
        accept: {
            'text/csv': ['.csv',]
        },
        maxFiles: 1,
        onDrop: (files) => {
            setFile(files[0]);
        },
        onDropRejected: () => snackBarStore.error("File không được chấp thuận")
    });

    const {modalStore, studentStore, snackBarStore, periodStore} = useStore();
    return (
        <Grid className='add_account'>
            <Grid className="modal_body">
                <Box className="title_account">
                    <Typography className="title_account_" variant="h5" gutterBottom>
                        Thêm Tài Khoản Sinh Viên
                    </Typography>
                </Box>
                <Box display="block" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                    <Box sx={{height: 'fit-content',}} gridColumn="span 11">
                        <Box className="top_dropzone">
                            <Typography className="title_top_dropzone" variant="h6" color="inherit" component="div">
                                Tải File lên
                            </Typography>
                            <LoadingButton
                                className="button_up_file"
                                variant="contained"
                                disabled={!file}
                                loading={studentStore.loadingUpload}
                                onClick={() => {
                                    studentStore
                                        .create(file, periodId)
                                        .then(async () => {
                                            store.modalStore.closeModal();
                                            store.snackBarStore.success("Tạo tài khoản thành công");
                                            await periodStore.get(periodId)
                                        })
                                }}
                            >Tải lên</LoadingButton>
                        </Box>
                        <Box {...getRootProps({className: 'container_dropzone'})}>
                            {!(isDragActive || file) &&
                                <>
                                    <UploadFileIcon className='icon_dropzone_'/>
                                    <Box className="icon_dropzone">
                                        <Typography className='typo_dropzone'>Kéo thả file vào đây để nhập thông tin.
                                            Định dạng hỗ trợ .csv</Typography>
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

export default observer(AddStudentModal);