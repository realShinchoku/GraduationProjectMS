import {observer} from "mobx-react-lite";
import TestApi from "./Api/TestApi";
import {useStore} from "../../app/stores/store";
import {Button} from "@mui/material";

function Test() {
    const {modalStore} = useStore();

    return (
        <>
            <Button onClick={() => {
                modalStore.openModal(<div>modal here</div>)
            }}> 
            open modal
            </Button>
            <TestApi/>
        </>
    )
}

export default observer(Test)