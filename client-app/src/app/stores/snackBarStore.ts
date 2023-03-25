import {AlertColor} from "@mui/material";
import {makeAutoObservable} from "mobx";

interface SnackBar {
    open: boolean;
    message: string;
    severity: AlertColor;
}

export default class SnackBarStore {
    snackBar: SnackBar = {
        open: false,
        message: '',
        severity: 'success'
    }

    constructor() {
        makeAutoObservable(this);
    }

    success = (message: string) => {
        this.snackBar.message = message;
        this.snackBar.open = true;
        this.snackBar.severity = 'success';
    }
    warning = (message: string) => {
        this.snackBar.message = message;
        this.snackBar.open = true;
        this.snackBar.severity = 'warning';
    }
    info = (message: string) => {
        this.snackBar.message = message;
        this.snackBar.open = true;
        this.snackBar.severity = 'info';
    }
    error = (message: string) => {
        this.snackBar.message = message;
        this.snackBar.open = true;
        this.snackBar.severity = 'error';
    }
    close = () => {
        this.snackBar.open = false;
    }

}