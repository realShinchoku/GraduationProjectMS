import React, {useEffect} from 'react';
import './styles.css';
import {Outlet, ScrollRestoration} from "react-router-dom";
import {observer} from "mobx-react-lite";
import NavBar from "./NavBar";
import {useStore} from "../stores/store";

function App() {
    
    const {userStore:{login,user}} = useStore();
    
    useEffect(() =>{
        login({email:'',password:''}).then(() =>console.log(user))
            .catch(err => console.log(err));
    },[login,user])
    
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
