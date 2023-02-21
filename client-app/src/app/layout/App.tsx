import {Outlet, ScrollRestoration} from "react-router-dom";
import {observer} from "mobx-react-lite";
import NavBar from "./NavBar";
import './styles.css';
import Login from "../../features/Account/Login";
import {useStore} from "../stores/store";
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
