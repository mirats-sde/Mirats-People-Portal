import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import { doc, setDoc } from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";
import Snackbar from "@mui/material/Snackbar";

const AadharCard = ({
  position,
  setPosition,
  handleClose,
  handleClickOpen,
}) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  const [positionInfo, setPositionInfo] = useState();

  useEffect(() => {
    setPositionInfo({
      ...positionInfo,
      position: userData?.WorkDetails?.position,
      grade: userData?.WorkDetails?.grade,
    });
  }, [userData]);

  console.log(positionInfo);

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
          position: positionInfo?.position,
          grade: positionInfo?.grade,
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Position and Grade Details Updated Successfully !",
    });
    console.log("position and grade changed successfully");
    handleClose(setPosition);
  };

  return (
    <>
      <Dialog
        sx={{ borderRadius: "25" }}
        open={position}
        onClose={() => handleClose(setPosition)}
      >
        <form>
          <div className={styles.dialogform}>
            <DialogTitle>
              <h2>Position / Job Role</h2>
            </DialogTitle>
            <DialogContent>
              <div className={styles.field}>
                <TextField
                  margin="dense"
                  id="position"
                  label="Position / Job Role"
                  placeholder="Software Developer Engineer"
                  fullWidth
                  variant="outlined"
                  value={positionInfo?.position}
                  onChange={(e) => {
                    setPositionInfo({
                      ...positionInfo,
                      position: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={styles.field}>
                <TextField
                  margin="dense"
                  id="grade"
                  label="Grade"
                  placeholder="A141020-1A"
                  fullWidth
                  variant="outlined"
                  value={positionInfo?.grade}
                  onChange={(e) => {
                    setPositionInfo({
                      ...positionInfo,
                      grade: e.target.value,
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
              handleClose(setPosition);
              setPositionInfo({
                ...positionInfo,
                position: userData?.WorkDetails?.position,
                grade: userData?.WorkDetails?.grade,
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
