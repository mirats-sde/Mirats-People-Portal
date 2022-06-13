import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import { collection, doc, getDoc, query, setDoc } from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";
import Snackbar from "@mui/material/Snackbar";

const Email = ({ email, setemail, handleClose, handleClickOpen }) => {
  const [EmailInfo, setEmailInfo] = useState();
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  useEffect(() => {
    setEmailInfo(userData?.basicinfo?.email);
  }, [userData]);

  //form submit:
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
      { basicinfo: { ...userData?.basicinfo, email: EmailInfo } },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Email Updated Successfully !",
    });
    console.log("email data saved successfully");
    handleClose(setemail);
  };

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={email}
      onClose={() => handleClose(setemail)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Set Your Email Address</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="email"
                type="email"
                label="Email"
                fullWidth
                variant="outlined"
                value={EmailInfo}
                onChange={(e) => {
                  setEmailInfo(e.target.value);
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
            handleClose(setemail);
            setEmailInfo(userData?.basicinfo?.email);
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

export default Email;
