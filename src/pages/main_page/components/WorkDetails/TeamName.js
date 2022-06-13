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
import {
  doc,
  onSnapshot,
  onSnapshotsInSync,
  query,
  setDoc,
} from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";

const TeamName = ({ teamName, setTeamName, handleClose, handleClickOpen }) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);
  const [teamnameInfo, setTeamnameInfo] = useState();
  const [department, setDepartment] = useState([]);
  const [teams, setTeams] = useState([]);

  //get teams and departments:
  async function getTeams() {
    onSnapshot(
      doc(
        firestoredb,
        "miratsinsights",
        "peoples",
        "departments",
        "All_Departments"
      ),
      (doc) => {
        setTeams([]);
        const data = doc.data().departments;
        console.log(doc.data().departments);
        setTeams(doc.data().departments);
      }
    );
  }

  useEffect(() => {
    setTeamnameInfo({
      ...teamnameInfo,
      teamname: userData?.WorkDetails?.teamname,
    });
    getTeams();
  }, [userData]);

  console.log(teamnameInfo);
  console.log(teams);

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
          teamname: teamnameInfo?.teamname,
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Department Details Updated Successfully !",
    });
    console.log("teamname changed successfully");
    handleClose(setTeamName);
  };

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
              <select
                name=""
                id=""
                value={teamnameInfo?.teamname}
                onChange={(e) => {
                  setTeamnameInfo({
                    ...teamnameInfo,
                    teamname: e.target.value,
                  });
                }}
              >
                <option value="" selected disabled hidden>
                  Choose teams
                </option>

                {teams[userData?.WorkDetails?.department]?.map((teamName) => {
                  return <option value={teamName}>{teamName} </option>;
                })}
              </select>
            </div>
          </DialogContent>
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => {
            handleClose(setTeamName);
            setTeamnameInfo({
              ...teamnameInfo,
              teamname: userData?.WorkDetails?.teamname,
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

export default TeamName;
