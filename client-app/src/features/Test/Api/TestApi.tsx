import {observer} from "mobx-react-lite";
import Grid2 from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {useStore} from "../../../app/stores/store";
import {Button} from "@mui/material";

function TestApi() {

    const [token, setToken] = useState('');

    const {userStore: {resetPassword, login, sendResetPasswordLink, changePassword}} = useStore();

    useEffect(() => {
        login({email: 'bob@test.com', password: 'Pa$$w0rd'}).then(r => console.log('login ok'));
    }, [resetPassword, login, sendResetPasswordLink, changePassword])

    return (
        <>
            <Grid2 container md={12}>
                <Grid2 md={12}>
                    <Button onClick={() => login({
                        email: 'bob@test.com',
                        password: 'Pa$$w0rd'
                    }).then(() => console.log('login ok'))}
                    >Login</Button>
                </Grid2>
                <Grid2 md={12}>
                    <Button onClick={() => changePassword({
                        oldPassword: 'Pa$$w0rd',
                        newPassword: 'Pa$$w0rd'
                    }).then(() => console.log('change password ok'))}>changePassword</Button>
                </Grid2>
                <Grid2 md={12}>
                    <Button
                        onClick={() => sendResetPasswordLink('1951061055@e.tlu.edu.vn').then(r => console.log('sendResetPasswordLink ok'))}>sendResetPasswordLink</Button>
                </Grid2>
                <Grid2 md={12}>
                    <TextField onChange={(event) => setToken(event.target.value)}/>
                    <Button
                        onClick={() => resetPassword('1951061055@e.tlu.edu.vn', 'Pa$$w0rd', token).then(r => console.log('resetPassword ok'))}>resetPassword</Button>
                </Grid2>
            </Grid2>
        </>
    )
}

export default observer(TestApi);