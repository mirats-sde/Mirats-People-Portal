import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarMsg = ({ snackbarData, handleClose }) => {
  return (
    <>
      <Snackbar
        open={snackbarData?.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarData?.severity}
          sx={{ width: "100%" }}
        >
          {snackbarData?.msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackbarMsg;
