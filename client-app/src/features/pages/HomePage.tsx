import { observer } from "mobx-react-lite";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

function HomePage() {
    return (
        <>
            <Header />
            <Sidebar />
        </>
    )
}
export default observer(HomePage);