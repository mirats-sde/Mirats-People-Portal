import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";

const DrivingLicense = ({
  drivingLicense,
  setDrivingLicense,
  handleClose,
  handleClickOpen,
}) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={drivingLicense}
      onClose={() => handleClose(setDrivingLicense)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Driving License</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="licensename"
                label="Name"
                placeholder="Rohan Gupta"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="licensedate"
                type="date"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="licensenum"
                label="License Number"
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
          onClick={() => handleClose(setDrivingLicense)}
        >
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default DrivingLicense;
