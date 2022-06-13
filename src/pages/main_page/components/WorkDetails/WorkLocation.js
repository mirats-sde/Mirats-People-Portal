import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import { async } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";

const WorkLocation = ({
  workLocation,
  setWorkLocation,
  handleClose,
  handleClickOpen,
}) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  const [workLocationInfo, setWorkLocationInfo] = useState();

  useEffect(() => {
    setWorkLocationInfo({
      ...workLocationInfo,
      city: userData?.WorkDetails?.city,
      country: userData?.WorkDetails?.country,
    });
  }, [userData]);

  console.log(workLocationInfo);

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
          city: workLocationInfo?.city,
          country: workLocationInfo?.country,
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Department Location Updated Successfully !",
    });
    console.log("work location changed successfully");
    handleClose(setWorkLocation);
  };

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={workLocation}
      onClose={() => handleClose(setWorkLocation)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Work Location</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <div className={styles.two_column}>
                <TextField
                  margin="dense"
                  id="city"
                  label="City"
                  placeholder="Dwarka"
                  variant="outlined"
                  className={styles.city}
                  value={workLocationInfo?.city}
                  onChange={(e) => {
                    setWorkLocationInfo({
                      ...workLocationInfo,
                      city: e.target.value,
                    });
                  }}
                />
                <TextField
                  margin="dense"
                  id="country"
                  label="Country"
                  placeholder="India"
                  variant="outlined"
                  className={styles.country}
                  value={workLocationInfo?.country}
                  onChange={(e) => {
                    setWorkLocationInfo({
                      ...workLocationInfo,
                      country: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </DialogContent>
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => {
            handleClose(setWorkLocation);
            setWorkLocationInfo({
              ...workLocationInfo,
              city: userData?.WorkDetails?.city,
              country: userData?.WorkDetails?.country,
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

export default WorkLocation;
