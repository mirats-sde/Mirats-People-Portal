import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";

const AadharCard = ({
  position,
  setPosition,
  handleClose,
  handleClickOpen,
}) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={position}
      onClose={() => handleClose(setPosition)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Position / Job Role</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="position"
                label="Position / Job Role"
                placeholder="Software Developer Engineer"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="grade"
                label="Grade"
                placeholder="A141020-1A"
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
          onClick={() => handleClose(setPosition)}
        >
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default AadharCard;
