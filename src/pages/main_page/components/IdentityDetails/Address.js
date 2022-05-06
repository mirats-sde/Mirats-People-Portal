import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";

const Address = ({ address, setAddress, handleClose, handleClickOpen }) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={address}
      onClose={() => handleClose(setAddress)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Address</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="streetaddress"
                label="Street Address"
                placeholder="C-23, Block C,
                Sector 7"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
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
                id="zipcode"
                label="Zip Code"
                placeholder="110000"
                variant="outlined"
                className={styles.zipcode}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="state"
                label="State"
                placeholder="New Delhi"
                variant="outlined"
                className={styles.state}
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
          </DialogContent>
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => handleClose(setAddress)}
        >
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default Address;
