import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import { useContext, useReducer, useState, useEffect } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";
import Snackbar from "@mui/material/Snackbar";

const DrivingLicense = ({
  drivingLicense,
  setDrivingLicense,
  handleClose,
  handleClickOpen,
}) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  const [drivingLicenseInfo, setDrivingLicenseInfo] = useState({});

  useEffect(() => {
    setDrivingLicenseInfo({
      ...drivingLicenseInfo,
      name: userData?.IdentificationDetails?.driving_license?.name,
      date: userData?.IdentificationDetails?.driving_license?.date,
      license_number:
        userData?.IdentificationDetails?.driving_license?.license_number,
    });
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
        IdentificationDetails: {
          ...userData?.IdentificationDetails,
          driving_license: {
            ...userData?.driving_license,
            name: drivingLicenseInfo?.name,
            date: drivingLicenseInfo?.date,
            license_number: drivingLicenseInfo?.license_number,
          },
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Driving License Details Updated Successfully !",
    });
    console.log("driving license details changed successfully");
    handleClose(setDrivingLicense);
  };

  console.log(drivingLicenseInfo);

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={drivingLicense}
      onClose={() => handleClose(setDrivingLicense)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Driving License</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="licensename"
                label="Name"
                placeholder="Rohan Gupta"
                fullWidth
                variant="outlined"
                value={drivingLicenseInfo?.name}
                onChange={(e) => {
                  setDrivingLicenseInfo({
                    ...drivingLicenseInfo,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="licensedate"
                type="date"
                fullWidth
                variant="outlined"
                value={drivingLicenseInfo?.date
                  ?.toDate()
                  ?.toLocaleDateString("en-CA")}
                onChange={(e) => {
                  setDrivingLicenseInfo({
                    ...drivingLicenseInfo,
                    date: Timestamp.fromDate(new Date(e.target.value)),
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="licensenum"
                label="License Number"
                fullWidth
                variant="outlined"
                value={drivingLicenseInfo?.license_number}
                onChange={(e) => {
                  setDrivingLicenseInfo({
                    ...drivingLicenseInfo,
                    license_number: e.target.value,
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
            handleClose(setDrivingLicense);
            setDrivingLicenseInfo({
              ...drivingLicenseInfo,
              name: userData?.IdentificationDetails?.driving_license?.name,
              date: userData?.IdentificationDetails?.driving_license?.date,
              license_number:
                userData?.IdentificationDetails?.driving_license
                  ?.license_number,
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

export default DrivingLicense;
