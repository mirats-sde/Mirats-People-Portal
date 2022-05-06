import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";

const DOJ = ({ doj, setDoj, handleClose, handleClickOpen }) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={doj}
      onClose={() => handleClose(setDoj)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Date Of Joining</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="dojdate"
                type="date"
                fullWidth
                variant="outlined"
              />
            </div>
            {/* <div className={styles.field}>
              <TextField
                margin="dense"
                id="dojyear"
                type="month"
                fullWidth
                variant="outlined"
              />
            </div> */}
          </DialogContent>
        </div>
      </form>
      <div className={styles.form_btns}>
        <button className={styles.cancel} onClick={() => handleClose(setDoj)}>
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default DOJ;
