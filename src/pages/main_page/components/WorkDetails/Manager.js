import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import { async } from "q";
import { doc, setDoc } from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";
import Snackbar from "@mui/material/Snackbar";

const Manager = ({
  teamManager,
  setTeamManager,
  handleClose,
  handleClickOpen,
}) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  const [teamManagerInfo, setTeamManagerInfo] = useState();

  useEffect(() => {
    setTeamManagerInfo({
      ...teamManagerInfo,
      teammanager_name:
        userData?.WorkDetails?.TeamManagerInfo?.teammanager_name,
      teammanager_position:
        userData?.WorkDetails?.TeamManagerInfo?.teammanager_position,
      teammanager_email:
        userData?.WorkDetails?.TeamManagerInfo?.teammanager_email,
    });
  }, [userData]);

  console.log(teamManagerInfo);

  const handleSave = async (e) => {
    e.preventDefault();
    await setDoc(
      doc(
        firestoredb,
        "miratsinsights",
        "peoples",
        "employee",
        String(user?.uid)
      ),
      {
        WorkDetails: {
          ...userData?.WorkDetails,
          TeamManagerInfo: {
            ...userData?.WorkDetails?.TeamManagerInfo,
            teammanager_name: teamManagerInfo?.teammanager_name,
            teammanager_position: teamManagerInfo?.teammanager_position,
            teammanager_email: teamManagerInfo?.teammanager_email,
          },
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Team Manager Details Updated Successfully !",
    });
    console.log("team manager details changed successfully");
    handleClose(setTeamManager);
  };

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={teamManager}
      onClose={() => handleClose(setTeamManager)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Team Manager</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="teammanagername"
                label="Team Manager Name"
                fullWidth
                variant="outlined"
                value={teamManagerInfo?.teammanager_name}
                onChange={(e) => {
                  setTeamManagerInfo({
                    ...teamManagerInfo,
                    teammanager_name: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="teammanagerposition"
                label="Team Manager Position / Job Role"
                placeholder="Senior Software Developer Engineer"
                fullWidth
                variant="outlined"
                value={teamManagerInfo?.teammanager_position}
                onChange={(e) => {
                  setTeamManagerInfo({
                    ...teamManagerInfo,
                    teammanager_position: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="teammanageremail"
                label="Team Manager Email"
                placeholder="lokesh.naidu@miratsinsights.com"
                type="email"
                fullWidth
                variant="outlined"
                value={teamManagerInfo?.teammanager_email}
                onChange={(e) => {
                  setTeamManagerInfo({
                    ...teamManagerInfo,
                    teammanager_email: e.target.value,
                  });
                }}
              />
            </div>
          </DialogContent>
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => {
            handleClose(setTeamManager);
            setTeamManagerInfo({
              ...teamManagerInfo,
              teammanager_name: userData?.WorkDetails?.teammanager_name,
              teammanager_position: userData?.WorkDetails?.teammanager_position,
              teammanager_email: userData?.WorkDetails?.teammanager_email,
            });
          }}
        >
          Cancel
        </button>
        <button className={styles.save} onClick={handleSave}>
          Save
        </button>
      </div>
    </Dialog>
  );
};

export default Manager;
