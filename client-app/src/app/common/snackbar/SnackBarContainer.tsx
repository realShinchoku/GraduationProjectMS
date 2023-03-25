import {useStore} from "../../stores/store";
import {observer} from "mobx-react-lite";
import {Alert, Fade, Snackbar} from "@mui/material";

function SnackBarContainer() {
    const {snackBarStore} = useStore();

    return (
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} TransitionComponent={Fade}
                  open={snackBarStore.snackBar.open} autoHideDuration={6000} onClose={snackBarStore.close}>
            <Alert onClose={snackBarStore.close} severity={snackBarStore.snackBar.severity} sx={{width: "100%"}}>
                {snackBarStore.snackBar.message}
            </Alert>
        </Snackbar>
    );
}

export default observer(SnackBarContainer);
