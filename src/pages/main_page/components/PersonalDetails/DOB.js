import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../MainPage.module.css";
// import styles from "../../../../utils/Dialog.css";

const DOB = ({ birth, setdob, handleClose, handleClickOpen }) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={birth}
      onClose={() => handleClose(setdob)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Date of Birth</h2>
            <h4>Please review your date of birth.</h4>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <div className={styles.dob}>
                <input type="date" />
                <input type="month" />
                <input type="year" placeholder="2000" />
              </div>
            </div>
          </DialogContent>
          {/* <FormBtn /> */}
        </div>
      </form>
      <div className={styles.form_btns}>
        <button className={styles.cancel} onClick={() => handleClose(setdob)}>
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default DOB;
