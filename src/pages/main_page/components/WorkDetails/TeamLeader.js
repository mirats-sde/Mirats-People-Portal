import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";

const TeamLeader = ({
  teamLeader,
  setTeamLeader,
  handleClose,
  handleClickOpen,
}) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={teamLeader}
      onClose={() => handleClose(setTeamLeader)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Team Leader</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="teamleadername"
                label="Team Leader Name"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="teamleaderposition"
                label="Team Leader Position / Job Role"
                placeholder="Senior Software Developer Engineer"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="teamleaderemail"
                label="Team Leader Email"
                placeholder="lokesh.naidu@miratsinsights.com"
                type="email"
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
          onClick={() => handleClose(setTeamLeader)}
        >
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default TeamLeader;
