import {useStore} from "../../stores/store";
import {observer} from "mobx-react-lite";
import {Modal} from "@mui/material";

function ModalContainer() {
    const {modalStore} = useStore();

    return (
        <Modal open={modalStore.modal.open} onClose={modalStore.closeModal}>
            {modalStore.modal.body}
        </Modal>
    )
}

export default observer(ModalContainer);