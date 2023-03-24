import {observer} from "mobx-react-lite";
import TestApi from "./Api/TestApi";
import {useStore} from "../../app/stores/store";
import {Button} from "@mui/material";

function Test() {
<<<<<<< Updated upstream
    const {modalStore} = useStore();
    return (
        <>
            <Button onClick={() => {
                modalStore.openModal(<div>modal here</div>)
            }}> open modal</Button>
=======
    const {modalStore,snackBarStore} = useStore();
    

    return (
        <>
            <Button onClick={() => {
                snackBarStore.success('gust gust')
            }}>
                open modal
            </Button>
>>>>>>> Stashed changes
            <TestApi/>
        </>
    )
}

export default observer(Test)