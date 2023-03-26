import React from "react";
import ReactDOM from 'react-dom/client';
import {store, StoreContext} from "./app/stores/store";
import {router} from "./app/router/Routers";
import {RouterProvider} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './assets/css/config/_reset.scss';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {closeSnackbar, SnackbarProvider} from "notistack";
import CloseIcon from "@mui/icons-material/Close";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StoreContext.Provider value={store}>
            <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                autoHideDuration={5000}
                action={(snackbarId) => (<CloseIcon onClick={() => closeSnackbar(snackbarId)}/>)}
            >
                <RouterProvider router={router}/>
            </SnackbarProvider>
        </StoreContext.Provider>
    </LocalizationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
