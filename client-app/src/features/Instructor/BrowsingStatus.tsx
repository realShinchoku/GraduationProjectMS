import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {FormHelperText, Radio, Stack, TextField} from '@mui/material';
import {useStore} from '../../app/stores/store';
import UpdateSuccess from './UpdateSuccess';
import {Form, Formik} from "formik";
import {LoadingButton} from "@mui/lab";
import * as Yup from 'yup';
import {Dir} from "fs";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 586,
    height: 414,
    backgroundColor: 'background.paper',
    boxShadow: '24',
    p: 4,
    padding: '35px 44px',
};

export default function BrowsingStatus() {
    const {modalStore} = useStore();

    return (
        <Formik 
            initialValues={{picker: '', note: ''}} 
            onSubmit={(values) => console.log(values)}
            validationSchema={Yup.object().shape({
                picker: Yup.boolean().required('Vui lòng chọn trạng thái duyệt'),
                note: Yup.string().required('Vui lòng viết ghi chú'),
            })}
        >
            {({handleChange, isSubmitting, isValid, dirty, errors}) =>
            <Form className='browsing_status_box' style={style}>
                <FormControl className=''>
                    <FormLabel id="controlled-radio-buttons-group" sx={{marginBottom: '15px'}}>Trạng thái duyệt</FormLabel>
                    <RadioGroup
                        aria-labelledby="controlled-radio-buttons-group"
                        name="picker"
                        onChange={handleChange}
                        sx={{marginLeft: '75px'}}
                    >
                        <FormControlLabel className='chose' name={'picker'} sx={{"& span": {fontSize: '24px'}}} value={true} control={<Radio/>} label="Đồng ý"/>
                        <FormControlLabel className='chose' name={'picker'}  sx={{"& span": {fontSize: '24px'}}} value={false} control={<Radio/>} label="Không đồng ý"/>
                    </RadioGroup>
                    <FormHelperText error={dirty && !!errors.picker}>{errors.picker}</FormHelperText>
                </FormControl>
                <Typography id="modal-modal-description" sx={{"& fieldset": {fontSize: '24px'}, mt: 2}}>
                    <TextField 
                        sx={{"& label": {fontSize: '24px'}, width: '400px', height: '50px', marginLeft: '30px'}}
                        name='note' onChange={handleChange} label="Ghi chú" focused id="filled-size-normal"
                        error={dirty && !!errors.note}
                        helperText={dirty && errors.note}
                    />
                </Typography>
                <Stack sx={{marginTop: '90px', display: 'block',}} direction="row" spacing={8} display={'flex'}
                       textAlign={'center'}>
                    <LoadingButton 
                        sx={{textTransform: 'capitalize', width: '144px', height: '54px', fontSize: '24px', borderRadius: '8px'}} 
                        variant="contained" 
                        type='submit' 
                        loading={isSubmitting}
                        disabled={!isValid || !dirty}
                    >
                        Xác nhận
                    </LoadingButton>
                    <Button sx={{textTransform: 'capitalize', width: '144px', height: '54px', fontSize: '24px', borderRadius: '8px'}} 
                            variant="outlined" 
                            onClick={() => modalStore.closeModal()}
                    >
                        Thoát
                    </Button>
                </Stack>
            </Form>
            }
        </Formik>
    );
}