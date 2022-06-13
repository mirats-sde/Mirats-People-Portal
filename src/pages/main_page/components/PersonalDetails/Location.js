import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import { doc, getDoc, query, setDoc } from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";
import Snackbar from "@mui/material/Snackbar";

import tryer from "tryer";

const Location = ({ location, setLocation, handleClose, handleClickOpen }) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const [LocationInfo, setLocationInfo] = useState({});
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  useEffect(() => {
    setLocationInfo({
      ...LocationInfo,
      city: userData?.basicinfo?.city,
      country: userData?.basicinfo?.country,
    });
  }, [userData]);

  console.log(LocationInfo);

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
        basicinfo: {
          ...userData?.basicinfo,
          city: LocationInfo?.city,
          country: LocationInfo?.country,
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Location Updated Successfully !",
    });
    console.log("Location changed successfully");
    handleClose(setLocation);
  };

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={location}
      onClose={() => handleClose(setLocation)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Set Your City & Country</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="city"
                label="City"
                fullWidth
                variant="outlined"
                value={LocationInfo?.city}
                onChange={(e) => {
                  setLocationInfo({
                    ...LocationInfo,
                    city: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="country"
                label="Country"
                fullWidth
                variant="outlined"
                value={LocationInfo?.country}
                onChange={(e) => {
                  setLocationInfo({
                    ...LocationInfo,
                    country: e.target.value,
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
            handleClose(setLocation);
            setLocationInfo({
              ...LocationInfo,
              city: userData?.basicinfo?.city,
              country: userData?.basicinfo?.country,
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

export default Location;
