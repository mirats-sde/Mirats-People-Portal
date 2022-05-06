import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";

const TeamName = ({ teamName, setTeamName, handleClose, handleClickOpen }) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={teamName}
      onClose={() => handleClose(setTeamName)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Team Name</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="teamname"
                label="Team Name"
                placeholder="Information Technology and Services"
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
          onClick={() => handleClose(setTeamName)}
        >
          Cancel
        </button>
        <button className={styles.save}>Save</button>
      </div>
    </Dialog>
  );
};

export default TeamName;
