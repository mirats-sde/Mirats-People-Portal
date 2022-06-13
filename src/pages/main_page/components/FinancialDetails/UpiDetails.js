import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../MainPage.module.css";
import { useContext, useState } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";
import Snackbar from "@mui/material/Snackbar";

const UpiDetails = ({
  upiDetails,
  setUpiDetails,
  handleClose,
  handleClickOpen,
  secupiDetails,
  setsecupiDetails,
}) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  const [upiDetailsInfo, setupiDetailsInfo] = useState({});
  const [newupiDetailsInfo, setnewupiDetailsInfo] = useState({});

  //first upi details
  useEffect(() => {
    setupiDetailsInfo({
      ...upiDetailsInfo,
      account_name: userData?.UpiDetails?.[0].account_name,
      payment_service: userData?.UpiDetails?.[0]?.payment_service,
      upi_ID: userData?.UpiDetails?.[0]?.upi_ID,
    });
  }, [userData]);

  console.log(upiDetailsInfo);

  //first upi details save
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
        UpiDetails: {
          ...userData?.UpiDetails,
          0: {
            ...userData?.UpiDetails?.[0],
            account_name: upiDetailsInfo?.account_name,
            payment_service: upiDetailsInfo?.payment_service,
            upi_ID: upiDetailsInfo?.upi_ID,
          },
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "UPI Details Changed Successfully !",
    });
    console.log("upi details changed successfully");
    handleClose(setUpiDetails);
  };

  //second upi details
  useEffect(() => {
    setnewupiDetailsInfo({
      ...newupiDetailsInfo,
      account_name: userData?.UpiDetails?.[1]?.account_name,
      payment_service: userData?.UpiDetails?.[1]?.payment_service,
      upi_ID: userData?.UpiDetails?.[1]?.upi_ID,
    });
  }, [userData]);

  console.log(newupiDetailsInfo);
  console.log(userData);

  //second upi details save form;
  const handleFormSave = async (e) => {
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
        UpiDetails: {
          ...userData?.UpiDetails,
          1: {
            ...userData?.UpiDetails?.[1],
            account_name: newupiDetailsInfo?.account_name,
            payment_service: newupiDetailsInfo?.payment_service,
            upi_ID: newupiDetailsInfo?.upi_ID,
          },
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Other UPI Details Changed Successfully !",
    });
    console.log("upi details changed successfully");
    handleClose(setsecupiDetails);
  };

  return (
    <>
      {upiDetails ? (
        <>
          <UPIModal
            upiDetails={upiDetails}
            setUpiDetails={setUpiDetails}
            handleSave={handleSave}
            handleClose={handleClose}
            upiDetailsInfo={upiDetailsInfo}
            setupiDetailsInfo={setupiDetailsInfo}
            userData={userData?.UpiDetails?.["0"]}
          />
        </>
      ) : (
        <>
          <UPIModal
            upiDetails={secupiDetails}
            setUpiDetails={setsecupiDetails}
            handleSave={handleFormSave}
            handleClose={handleClose}
            upiDetailsInfo={newupiDetailsInfo}
            setupiDetailsInfo={setnewupiDetailsInfo}
            userData={userData?.UpiDetails?.["1"]}
          />
        </>
      )}
    </>
  );
};

const UPIModal = ({
  upiDetails,
  setUpiDetails,
  handleSave,
  handleClose,
  upiDetailsInfo,
  setupiDetailsInfo,
  userData,
}) => {
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={upiDetails}
      onClose={() => handleClose(setUpiDetails)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Default Upi</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="upiaccname"
                label="Account Name"
                fullWidth
                variant="outlined"
                value={upiDetailsInfo?.account_name}
                onChange={(e) => {
                  setupiDetailsInfo({
                    ...upiDetailsInfo,
                    account_name: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="payservice"
                label="Payment Service"
                placeholder="Google Pay/Phone Pay/Paytm"
                fullWidth
                variant="outlined"
                value={upiDetailsInfo?.payment_service}
                onChange={(e) => {
                  setupiDetailsInfo({
                    ...upiDetailsInfo,
                    payment_service: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="upiid"
                label="UPI ID"
                fullWidth
                variant="outlined"
                value={upiDetailsInfo?.upi_ID}
                onChange={(e) => {
                  setupiDetailsInfo({
                    ...upiDetailsInfo,
                    upi_ID: e.target.value,
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
            handleClose(setUpiDetails);
            setupiDetailsInfo(userData);
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

export default UpiDetails;
