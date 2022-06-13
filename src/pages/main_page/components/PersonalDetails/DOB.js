import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { doc, getDoc, query, setDoc, Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { firestoredb } from "../../../../firebase-config";
import { userAuthContext } from "../../../context/Userauthcontext";
import styles from "../../MainPage.module.css";
// import styles from "../../../../utils/Dialog.css";
import Snackbar from "@mui/material/Snackbar";

const DOB = ({ birth, setdob, handleClose, handleClickOpen }) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);
  const [DOBInfo, setDOBInfo] = useState();

  useEffect(() => {
    setDOBInfo(userData?.basicinfo?.dob);
  }, [userData]);

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
        basicinfo: { ...userData?.basicinfo, dob: DOBInfo },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "DOB Updated Successfully !",
    });
    console.log("date of birth changed successfully");
    handleClose(setdob);
  };

  console.log(user);

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
                <input
                  type="date"
                  value={DOBInfo?.toDate()?.toLocaleDateString("en-CA")}
                  onChange={(e) => {
                    setDOBInfo(Timestamp.fromDate(new Date(e.target.value)));
                  }}
                />
              </div>
            </div>
          </DialogContent>
          {/* <FormBtn /> */}
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => {
            handleClose(setdob);
            setDOBInfo(userData?.basicinfo?.dob);
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

export default DOB;
