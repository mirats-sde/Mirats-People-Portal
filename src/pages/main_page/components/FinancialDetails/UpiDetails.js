import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";

const UpiDetails = ({
  upiDetails,
  setUpiDetails,
  handleClose,
  handleClickOpen,
}) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={upiDetails}
      onClose={() => handleClose(setUpiDetails)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Default Upi</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="upiaccname"
                label="Account Name"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="payservice"
                label="Payment Service"
                placeholder="Google Pay/Phone Pay/Paytm"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="upiid"
                label="UPI ID"
                fullWidth
                variant="outlined"
              />
            </div>
          </DialogContent>
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => handleClose(setUpiDetails)}
        >
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default UpiDetails;
