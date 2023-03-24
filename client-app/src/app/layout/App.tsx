import {Outlet, ScrollRestoration} from "react-router-dom";
import {observer} from "mobx-react-lite";
import ModalContainer from "../common/modal/ModalContainer";
import {useEffect} from "react";
import {useStore} from "../stores/store";
import LoadingCircular from "./LoadingCircular";
import SnackBarContainer from "../common/snackbar/SnackBarContainer";

function App() {

    const {commonStore, userStore} = useStore();

    useEffect(() => {
        if (commonStore.token)
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        else
            commonStore.setAppLoaded();
    }, [commonStore, userStore])

    if (!commonStore.appLoaded)
        return <LoadingCircular size={60}/>

    return (
        <>
            <ScrollRestoration/>
            <SnackBarContainer/>
            <ModalContainer/>
            <Outlet/>
        </>
    );
}

export default observer(App);
