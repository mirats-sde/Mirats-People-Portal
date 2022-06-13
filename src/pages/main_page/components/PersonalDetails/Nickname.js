import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";
import Snackbar from "@mui/material/Snackbar";

const Location = ({ nickname, setNickname, handleClose, handleClickOpen }) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const [NicknameInfo, setNicknameInfo] = useState();
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  useEffect(() => {
    setNicknameInfo(userData?.basicinfo?.nickname);
  }, [userData]);

  //nick name
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
        basicinfo: { ...userData?.basicinfo, nickname: NicknameInfo },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Nickname Updated Successfully !",
    });
    console.log("nick name changed successfully");
    handleClose(setNickname);
  };

  console.log(NicknameInfo);
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={nickname}
      onClose={() => handleClose(setNickname)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Set Your Nickname</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="nickname"
                label="Nickname"
                fullWidth
                variant="outlined"
                value={NicknameInfo}
                onChange={(e) => {
                  setNicknameInfo(e.target.value);
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
            handleClose(setNickname);
            setNicknameInfo(userData?.basicinfo?.nickname);
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

export default Location;
