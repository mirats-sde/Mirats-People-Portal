import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";

const AadharCard = ({
  aadharCard,
  setAadharCard,
  handleClose,
  handleClickOpen,
}) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={aadharCard}
      onClose={() => handleClose(setAadharCard)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Aadhar Card</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="aadharname"
                label="Aadhar Name"
                placeholder="Rohan Gupta"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="bdaydate"
                type="date"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="aadharnum"
                label="Aadhar Number"
                type="number"
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
          onClick={() => handleClose(setAadharCard)}
        >
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default AadharCard;
