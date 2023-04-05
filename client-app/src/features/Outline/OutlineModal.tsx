import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {FormHelperText, Radio, Stack, TextField} from '@mui/material';
import {useStore} from '../../app/stores/store';
import {Form, Formik} from "formik";
import {LoadingButton} from "@mui/lab";
import * as Yup from 'yup';
import {observer} from "mobx-react-lite";
import SuccessModal from "./SuccessModal";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 586,
    height: 414,
    backgroundColor: '#f4f4f4',
    boxShadow: '24',
    p: 4,
    padding: '35px 44px',
};

function OutlineModal() {
    const {modalStore} = useStore();

    return (
        <Formik
            initialValues={{picker: -1, note: ''}}
            // onSubmit={(values) => approval( values.picker, values.note).then(() => modalStore.openModal(
            //     <SuccessModal/>))}
            onSubmit={()=>modalStore.openModal(<SuccessModal/>)}
            validationSchema={Yup.object().shape({
                picker: Yup.boolean().required('Vui lòng chọn trạng thái duyệt'),
                note: Yup.string().required('Vui lòng viết ghi chú'),
            })}
        >
            {({handleChange, isSubmitting, isValid, dirty, errors}) =>
                <Form className='browsing_status_box' style={style}>
                    <FormControl>
                        <FormLabel id="controlled-radio-buttons-group" sx={{marginBottom: '15px'}}>Trạng thái
                            duyệt</FormLabel>
                        <RadioGroup
                            aria-labelledby="controlled-radio-buttons-group"
                            name="picker"
                            onChange={handleChange}
                            sx={{marginLeft: '75px'}}
                        >
                            <FormControlLabel className='chose' name={'picker'} sx={{"& span": {fontSize: '24px'}}}
                                              value={1} control={<Radio/>} label="Đồng ý"/>
                            <FormControlLabel className='chose' name={'picker'} sx={{"& span": {fontSize: '24px'}}}
                                              value={0} control={<Radio/>} label="Không đồng ý"/>
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
                            sx={{
                                textTransform: 'capitalize',
                                width: '144px',
                                height: '54px',
                                fontSize: '24px',
                                borderRadius: '8px'
                            }}
                            variant="contained"
                            type='submit'
                            loading={isSubmitting}
                            disabled={!isValid || !dirty}
                        >
                            Xác nhận
                        </LoadingButton>
                        <Button sx={{
                            textTransform: 'capitalize',
                            width: '144px',
                            height: '54px',
                            fontSize: '24px',
                            borderRadius: '8px'
                        }}
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

export default observer(OutlineModal);