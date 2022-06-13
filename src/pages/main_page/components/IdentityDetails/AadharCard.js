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

const AadharCard = ({
  aadharCard,
  setAadharCard,
  handleClose,
  handleClickOpen,
}) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const [aadharInfo, setAadharInfo] = useState();
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  useEffect(() => {
    setAadharInfo({
      ...aadharInfo,
      aadhar_name: userData?.IdentificationDetails?.aadhar_card?.aadhar_name,
      date: userData?.IdentificationDetails?.aadhar_card?.date,
      aadharnumber: userData?.IdentificationDetails?.aadhar_card?.aadharnumber,
    });
  }, [userData]);

  console.log(aadharInfo);

  console.log(aadharInfo?.aadhar_name);

  const handleSave = async (e) => {
    console.log("here in save function");
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
          aadhar_card: {
            ...userData?.IdentificationDetails?.aadhar_card,
            aadhar_name: aadharInfo?.aadhar_name,
            date: aadharInfo?.date,
            aadharnumber: aadharInfo?.aadharnumber,
          },
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Aadhar Card Details Updated Successfully !",
    });
    console.log("aadhar card details changed successfully");
    handleClose(setAadharCard);
  };

  return (
    <>
      <Dialog
        sx={{ borderRadius: "25" }}
        open={aadharCard}
        onClose={() => handleClose(setAadharCard)}
      >
        {" "}
        <form>
          <div className={styles.dialogform}>
            <DialogTitle>
              <h2>Aadhar Card</h2>
            </DialogTitle>
            <DialogContent>
              <div className={styles.field}>
                <TextField
                  margin="dense"
                  id="aadharname"
                  label="Aadhar Name"
                  placeholder="Rohan Gupta"
                  fullWidth
                  variant="outlined"
                  value={aadharInfo?.aadhar_name}
                  onChange={(e) => {
                    setAadharInfo({
                      ...aadharInfo,
                      aadhar_name: e.target.value,
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
                  value={aadharInfo?.date
                    ?.toDate()
                    ?.toLocaleDateString("en-CA")}
                  onChange={(e) => {
                    setAadharInfo({
                      ...aadharInfo,
                      date: Timestamp.fromDate(new Date(e.target.value)),
                    });
                  }}
                />
              </div>
              <div className={styles.field}>
                <TextField
                  margin="dense"
                  id="aadharnum"
                  label="Aadhar Number"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={aadharInfo?.aadharnumber}
                  onChange={(e) => {
                    setAadharInfo({
                      ...aadharInfo,
                      aadharnumber: e.target.value,
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
              handleClose(setAadharCard);
              setAadharInfo({
                ...aadharInfo,
                aadhar_name:
                  userData?.IdentificationDetails?.aadhar_card?.aadhar_name,
                date: userData?.IdentificationDetails?.aadhar_card?.date,
                aadharnumber:
                  userData?.IdentificationDetails?.aadhar_card?.aadharnumber,
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
    </>
  );
};

export default AadharCard;
