import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import { async } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";

const TeamLeader = ({
  teamLeader,
  setTeamLeader,
  handleClose,
  handleClickOpen,
}) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  const [teamleaderInfo, setTeamleaderInfo] = useState();

  console.log(teamleaderInfo);

  useEffect(() => {
    setTeamleaderInfo({
      ...teamleaderInfo,
      teamleader_name: userData?.WorkDetails?.TeamLeaderInfo?.teamleader_name,
      teamleader_position:
        userData?.WorkDetails?.TeamLeaderInfo?.teamleader_position,
      teamleader_email: userData?.WorkDetails?.TeamLeaderInfo?.teamleader_email,
    });
  }, [userData]);

  console.log(teamleaderInfo);

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
          TeamLeaderInfo: {
            ...userData?.WorkDetails?.TeamLeaderInfo,
            teamleader_name: teamleaderInfo?.teamleader_name,
            teamleader_position: teamleaderInfo?.teamleader_position,
            teamleader_email: teamleaderInfo?.teamleader_email,
          },
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Team Leader Details Updated Successfully !",
    });
    console.log("team leader details changed successfullyð");
    handleClose(setTeamLeader);
  };

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
                value={teamleaderInfo?.teamleader_name}
                onChange={(e) => {
                  setTeamleaderInfo({
                    ...teamleaderInfo,
                    teamleader_name: e.target.value,
                  });
                }}
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
                value={teamleaderInfo?.teamleader_position}
                onChange={(e) => {
                  setTeamleaderInfo({
                    ...teamleaderInfo,
                    teamleader_position: e.target.value,
                  });
                }}
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
                value={teamleaderInfo?.teamleader_email}
                onChange={(e) => {
                  setTeamleaderInfo({
                    ...teamleaderInfo,
                    teamleader_email: e.target.value,
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
            handleClose(setTeamLeader);
            setTeamleaderInfo({
              ...teamleaderInfo,
              teamleader_name: userData?.WorkDetails?.teamleader_name,
              teamleader_position: userData?.WorkDetails?.teamleader_position,
              teamleader_email: userData?.WorkDetails?.teamleader_email,
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

export default TeamLeader;
