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

const PanCard = ({ panCard, setPanCard, handleClose, handleClickOpen }) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  const [pancardInfo, setPancardInfo] = useState({});

  useEffect(() => {
    setPancardInfo({
      ...pancardInfo,
      pan_name: userData?.IdentificationDetails?.pan_card?.pan_name,
      date: userData?.IdentificationDetails?.pan_card?.date,
      pan_number: userData?.IdentificationDetails?.pan_card?.pan_number,
    });
  }, [userData]);

  console.log(pancardInfo);

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
        IdentificationDetails: {
          ...userData?.IdentificationDetails,
          pan_card: {
            pan_name: pancardInfo?.pan_name,
            date: pancardInfo?.date,
            pan_number: pancardInfo?.pan_number,
          },
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "PAN Card Details Updated Successfully !",
    });
    console.log("pan card details changed successfully");
    handleClose(setPanCard);
  };

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={panCard}
      onClose={() => handleClose(setPanCard)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>PAN Card</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="panname"
                label="Pan Name"
                placeholder="Rohan Gupta"
                fullWidth
                variant="outlined"
                value={pancardInfo?.pan_name}
                onChange={(e) => {
                  setPancardInfo({
                    ...pancardInfo,
                    pan_name: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="bdaydate"
                type="date"
                fullWidth
                variant="outlined"
                value={pancardInfo?.date?.toDate()?.toLocaleDateString("en-CA")}
                onChange={(e) => {
                  setPancardInfo({
                    ...pancardInfo,
                    date: Timestamp.fromDate(new Date(e.target.value)),
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="pannum"
                label="Pan Number"
                fullWidth
                variant="outlined"
                value={pancardInfo?.pan_number}
                onChange={(e) => {
                  setPancardInfo({
                    ...pancardInfo,
                    pan_number: e.target.value,
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
            handleClose(setPanCard);
            setPancardInfo({
              ...pancardInfo,
              pan_name: userData?.IdentificationDetails?.pan_card?.pan_name,
              date: userData?.IdentificationDetails?.pan_card?.date,
              pan_number: userData?.IdentificationDetails?.pan_card?.pan_number,
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

export default PanCard;
