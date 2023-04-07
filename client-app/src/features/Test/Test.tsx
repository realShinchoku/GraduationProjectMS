import {observer} from "mobx-react-lite";
import TestApi from "./Api/TestApi";
import {useStore} from "../../app/stores/store";
import {Button} from "@mui/material";

function Test() {
    const {snackBarStore} = useStore();

    return (
        <>
            <Button onClick={() => {
                snackBarStore.error('test')
            }}>
                open modal
            </Button>
            <Button onClick={() => {
                snackBarStore.success('test')
            }}>
                open modal
            </Button>
            <TestApi/>
        </>
    )
}

export default observer(Test)