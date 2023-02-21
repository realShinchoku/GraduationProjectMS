import {Outlet, ScrollRestoration} from "react-router-dom";
import {observer} from "mobx-react-lite";
import ModalContainer from "../common/modal/ModalContainer";

function App() {

    return (
        <>
            <ScrollRestoration/>
            <ModalContainer/>
            <Outlet/>
        </>
    );
}

export default observer(App);
