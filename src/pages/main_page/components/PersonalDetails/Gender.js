import { async } from "@firebase/util";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { collection, doc, getDoc, query, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { firestoredb } from "../../../../firebase-config";
import { userAuthContext } from "../../../context/Userauthcontext";
import styles from "../../MainPage.module.css";
// import styles from "../../../../utils/Dialog.css";
import Snackbar from "@mui/material/Snackbar";

const Gender = ({ gender, setgender, handleClose, handleClickOpen }) => {
  const [GenderInfo, setGenderInfo] = useState();
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);
  useEffect(() => {
    setGenderInfo(userData?.basicinfo?.gender);
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
        basicinfo: { ...userData?.basicinfo, gender: GenderInfo },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Gender Updated Successfully !",
    });
    console.log("gender changed successfully");
    handleClose(setgender);
  };

  console.log(GenderInfo);
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={gender}
      onClose={() => handleClose(setgender)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Gender</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <div className={styles.gender}>
                <input
                  type="radio"
                  name="Gender"
                  value="Male"
                  checked={GenderInfo === "Male" ? true : false}
                  onChange={(e) => {
                    setGenderInfo(e.target.value);
                  }}
                />
                <label>Male</label>
                <input
                  type="radio"
                  name="Gender"
                  value="Female"
                  checked={GenderInfo === "Female" ? true : false}
                  onChange={(e) => {
                    setGenderInfo(e.target.value);
                  }}
                />
                <label>Female</label>
                <input
                  type="radio"
                  name="Gender"
                  value="Others"
                  checked={GenderInfo === "Others" ? true : false}
                  onChange={(e) => {
                    setGenderInfo(e.target.value);
                  }}
                />
                <label>Others</label>
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
            handleClose(setgender);
            setGenderInfo(userData?.basicinfo?.gender);
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

export default Gender;
