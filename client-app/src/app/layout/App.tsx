import {Outlet, ScrollRestoration} from "react-router-dom";
import {observer} from "mobx-react-lite";
import NavBar from "./NavBar";
import './styles.css';
import Login from "../../features/Account/Login";
import {useStore} from "../stores/store";

function App() {

    const {userStore: {isLoggedIn}} = useStore();

    return (
        <>
            <ScrollRestoration/>
            {!isLoggedIn ? <Login/> : (
                <>
                    <NavBar/>
                    <Outlet/>
                </>
            )}
        </>
    );
}

export default observer(App);
