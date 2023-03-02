import {Outlet, ScrollRestoration} from "react-router-dom";
import {observer} from "mobx-react-lite";
import ModalContainer from "../common/modal/ModalContainer";
import {useEffect} from "react";
import {useStore} from "../stores/store";
import {CircularProgress, Container} from "@mui/material";

function App() {

    const {commonStore, userStore} = useStore();

    useEffect(() => {
        if (commonStore.token)
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        else
            commonStore.setAppLoaded();
    }, [commonStore, userStore])
    
    if(!commonStore.appLoaded)
        return(
           <Container>
               <CircularProgress size={40} />
           </Container>
       )

    return (
        <>
            <ScrollRestoration/>
            <ModalContainer/>
            <Outlet/>
        </>
    );
}

export default observer(App);
