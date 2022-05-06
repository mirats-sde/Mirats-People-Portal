import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../MainPage.module.css";
// import styles from "../../../../utils/Dialog.css";

const Gender = ({ gender, setgender, handleClose, handleClickOpen }) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={gender}
      onClose={() => handleClose(setgender)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Gender</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <div className={styles.gender}>
                <input type="radio" />
                <label>Male</label>
                <input type="radio"/>
                <label>Female</label>
                <input type="radio"/>
                <label>Others</label>
              </div>
            </div>
          </DialogContent>
          {/* <FormBtn /> */}
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => handleClose(setgender)}
        >
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default Gender;
