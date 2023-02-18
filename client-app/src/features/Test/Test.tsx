import {observer} from "mobx-react-lite";
import TestApi from "./Api/TestApi";

function Test() {
    return (
        <>
            <TestApi/>
        </>
    )
}

export default observer(Test)