import {Outlet, ScrollRestoration} from "react-router-dom";
import {observer} from "mobx-react-lite";
import ModalContainer from "../common/modal/ModalContainer";
import {useEffect} from "react";
import {useStore} from "../stores/store";

function App() {

    const {commonStore, userStore} = useStore();

    useEffect(() => {
        if (commonStore.token)
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        else
            commonStore.setAppLoaded();
    }, [commonStore, userStore])

    return (
        <>
            <ScrollRestoration/>
            <ModalContainer/>
            <Outlet/>
        </>
    );
}

export default observer(App);
