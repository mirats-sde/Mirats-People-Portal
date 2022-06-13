import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";
import Snackbar from "@mui/material/Snackbar";

const DOJ = ({ doj, setDoj, handleClose, handleClickOpen }) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  const [dojInfo, setDojInfo] = useState();

  useEffect(() => {
    setDojInfo({
      ...dojInfo,
      doj: userData?.WorkDetails?.doj,
    });
  }, [userData]);

  console.log(dojInfo);

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
          doj: dojInfo?.doj,
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Date Of Join Updated Successfully !",
    });
    console.log("date of join changed successfully");
    handleClose(setDoj);
  };

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={doj}
      onClose={() => handleClose(setDoj)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Date Of Joining</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="dojdate"
                type="date"
                fullWidth
                variant="outlined"
                value={dojInfo?.doj?.toDate().toLocaleDateString("en-CA")}
                onChange={(e) => {
                  setDojInfo({
                    ...dojInfo,
                    doj: Timestamp.fromDate(new Date(e.target.value)),
                  });
                }}
              />
            </div>
            {/* <div className={styles.field}>
              <TextField
                margin="dense"
                id="dojyear"
                type="month"
                fullWidth
                variant="outlined"
              />
            </div> */}
          </DialogContent>
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => {
            handleClose(setDoj);
            setDojInfo({
              ...dojInfo,
              doj: userData?.WorkDetails?.doj,
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

export default DOJ;
