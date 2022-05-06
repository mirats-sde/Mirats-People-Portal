import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";

const WorkLocation = ({
  workLocation,
  setWorkLocation,
  handleClose,
  handleClickOpen,
}) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={workLocation}
      onClose={() => handleClose(setWorkLocation)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Department</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <div className={styles.two_column}>
                <TextField
                  margin="dense"
                  id="city"
                  label="City"
                  placeholder="Dwarka"
                  variant="outlined"
                  className={styles.city}
                />
                <TextField
                  margin="dense"
                  id="country"
                  label="Country"
                  placeholder="India"
                  variant="outlined"
                  className={styles.country}
                />
              </div>
            </div>
          </DialogContent>
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => handleClose(setWorkLocation)}
        >
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default WorkLocation;
