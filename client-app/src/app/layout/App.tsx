import {Outlet, ScrollRestoration} from "react-router-dom";
import {observer} from "mobx-react-lite";
import NavBar from "./NavBar";
import './styles.css';

function App() {
    
    return (
        <>
            <ScrollRestoration/>
            <NavBar/>
            <Outlet/>
        </>
    );
}

export default observer(App);
