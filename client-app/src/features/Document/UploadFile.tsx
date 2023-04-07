import {Box, Button, Typography} from '@mui/material';
import {useDropzone} from 'react-dropzone';
import {useState} from "react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {observer} from "mobx-react-lite";
import {LoadingButton} from "@mui/lab";
import {useStore} from '../../app/stores/store';
import {Document, Document_} from '../../assets';

function UploadFile() {

    const [file, setFile] = useState<any>();
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {
            'text/docx': ['.docx',]
        },
        maxFiles: 1,
        onDrop: (files) => {
            setFile(files[0]);
        },
    });

    const { studentStore} = useStore();
    return (
        <Box className='upload'>
            <Box className='upload_file'>
                <Box {...getRootProps()}>
                    {!(isDragActive || file) &&
                        <Box>
                            <Box className="thumb">
                                <Box component="img" src={Document} alt=""/>
                            </Box>
                            <Typography variant='body1'>Kéo thả file vào đây để nhập thông tin. Định dạng hỗ trợ
                                .docx</Typography>
                        </Box>
                    }
                    <input {...getInputProps()} />
                </Box>
                {file && <Box className='dropzone'>{}
                    <Button className={"icon_delete"} onClick={() => {
                        setFile(undefined);
                    }}
                            sx={{
                                padding: '0',
                                transform: 'translateX(8px)',
                                position: 'absolute',
                                bottom: '0',
                                right: '0',
                                border: 'none',
                                ':hover': {border: 'none', background: 'none'}
                            }} variant="outlined" startIcon={
                        <DeleteForeverOutlinedIcon
                            sx={{
                                '&:nth-of-type(1)': {fontSize: '18px'},
                                color: '#bebebe',
                                marginRight: '-20px',
                                marginBottom: '5px',
                            }}
                        />
                    }
                    />
                    <Box className="thumb">
                        <Box component="img" src={Document_} alt=""/>
                    </Box>
                    <Box className={"file_name"}>{file.name}</Box>
                </Box>}
            </Box>
            <Box className="btn">
                <LoadingButton
                    className="btn_up_file"
                    variant="contained"
                    disabled={!file}
                    loading={studentStore.loadingUpload}
                    // onClick={() => {
                    //     studentStore
                    //         .create(file, periodId)
                    //         .then(() => {
                    //             store.modalStore.closeModal();
                    //             store.snackBarStore.success("Tạo tài khoản thành công");
                    //         })
                    // }}
                >
                    Gửi
                </LoadingButton>
            </Box>
        </Box>
    );
}

export default observer(UploadFile);