import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";

const NameDialog = ({
  namedialog,
  setnamedialog,
  handleClose,
  handleClickOpen,
}) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={namedialog}
      onClose={() => handleClose(setnamedialog)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Name</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="name"
                label="First Name"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="name"
                label="Middle Name (optional)"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="name"
                label="Last Name"
                fullWidth
                variant="outlined"
              />
            </div>
          </DialogContent>
          {/* <FormBtn /> */}
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => handleClose(setnamedialog)}
        >
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default NameDialog;
