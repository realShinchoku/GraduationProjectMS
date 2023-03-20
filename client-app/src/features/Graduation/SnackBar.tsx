import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function SnackBar() {
  return (
    // <Snackbar
    //     autoHideDuration={3000}
    //     anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    //   >
    //     <Alert severity="success">
    //       Thêm mới thành thành công!
    //     </Alert>       
    // </Snackbar>
    <Alert severity="success">
          Thêm mới thành thành công!
    </Alert>
  );
}
