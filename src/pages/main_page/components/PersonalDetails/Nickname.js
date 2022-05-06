import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";

const Location = ({ nickname, setNickname, handleClose, handleClickOpen }) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={nickname}
      onClose={() => handleClose(setNickname)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Set Your Nickname</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="nickname"
                label="Nickname"
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
          onClick={() => handleClose(setNickname)}
        >
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default Location;
