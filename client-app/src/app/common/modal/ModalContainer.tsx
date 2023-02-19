import {useStore} from "../../stores/store";
import {Modal} from "@mui/material";
import {observer} from "mobx-react-lite";

function ModalContainer() {
    const {modalStore} = useStore();

    return (
        // <Modal open={modalStore.modal.open} onClose={modalStore.closeModal} >
        //         {/*{modalStore.modal.body}*/}
        // </Modal>
        <></>
    )
}

export default observer(ModalContainer);