import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import { useContext, useEffect, useState } from "react";
import { doc, documentId, getDoc, query, setDoc } from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";
import { userAuthContext } from "../../../context/Userauthcontext";
import Snackbar from "@mui/material/Snackbar";

const Number = ({ phoneno, setphoneno, handleClose, handleClickOpen }) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const [PhoneNoInfo, setPhoneNoInfo] = useState();
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  useEffect(() => {
    setPhoneNoInfo(userData?.basicinfo?.phonenumber);
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
        basicinfo: { ...userData?.basicinfo, phonenumber: PhoneNoInfo },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Phone Number Updated Successfully !",
    });
    console.log("phone number changed successfully!");
    handleClose(setphoneno);
  };

  console.log(PhoneNoInfo);
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={phoneno}
      onClose={() => handleClose(setphoneno)}
    >
      {" "}
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Set Your Phone Number</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                // className={styles.textfield}
                // className={classes.root}
                id="phoneno"
                type="number"
                label="Phone Number"
                fullWidth
                variant="outlined"
                value={PhoneNoInfo}
                onChange={(e) => {
                  setPhoneNoInfo(e.target.value);
                }}

                // inputProps={{ sx: { color: "#fff" } }}
              />
            </div>
          </DialogContent>
          {/* <FormBtn /> */}
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => {
            handleClose(setphoneno);
            setPhoneNoInfo(userData?.basicinfo?.phonenumber);
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

export default Number;
