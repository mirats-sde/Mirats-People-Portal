import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";

const Shift = ({ shift, setShift, handleClose, handleClickOpen }) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={shift}
      onClose={() => handleClose(setShift)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Shift Details</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="shifttype"
                label="Shift Type"
                placeholder="Morning/Night"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="shifttime"
                placeholder="10 AM - 7 PM"
                type="time"
                fullWidth
                variant="outlined"
              />
            </div>
          </DialogContent>
        </div>
      </form>
      <div className={styles.form_btns}>
        <button className={styles.cancel} onClick={() => handleClose(setShift)}>
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default Shift;
