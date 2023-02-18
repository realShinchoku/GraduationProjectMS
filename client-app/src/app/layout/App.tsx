import React from 'react';
import './styles.css';
import {Outlet, ScrollRestoration} from "react-router-dom";
import {observer} from "mobx-react-lite";
import NavBar from "./NavBar";

function App() {
    return (
        <>
            <ScrollRestoration/>
            <NavBar/>
            <Outlet/>
            {/* APP HERE */}
        </>
    );
}

export default observer(App);
