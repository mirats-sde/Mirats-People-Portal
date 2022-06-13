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
import { async } from "@firebase/util";
import Snackbar from "@mui/material/Snackbar";

const BankDetails = ({
  bankDetails,
  setBankDetails,
  handleClose,
  secbankDetails,
  setSecbankDetails,
  handleClickOpen,
}) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const [bankDetailsInfo, setBankDetailsInfo] = useState({});
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  const [newBankDetailsInfo, setNewBankDetailsInfo] = useState({});

  //default bank details:
  useEffect(() => {
    setBankDetailsInfo({
      ...bankDetailsInfo,
      account_name: userData?.BankDetails?.[0]?.account_name,
      bank_name: userData?.BankDetails?.[0]?.bank_name,
      account_no: userData?.BankDetails?.[0]?.account_no,
      ifsc_code: userData?.BankDetails?.[0]?.ifsc_code,
    });
  }, [userData]);

  //default bank details save:
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
        BankDetails: {
          ...userData?.BankDetails,
          0: {
            ...userData?.BankDetails?.[0],
            account_name: bankDetailsInfo?.account_name,
            bank_name: bankDetailsInfo?.bank_name,
            account_no: bankDetailsInfo?.account_no,
            ifsc_code: bankDetailsInfo?.ifsc_code,
          },
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Bank Details Changed Successfully !",
    });
    console.log("bank details changed successfully");
    handleClose(setBankDetails);
  };

  //secondary bank details:
  useEffect(() => {
    setNewBankDetailsInfo({
      ...newBankDetailsInfo,
      account_name: userData?.BankDetails?.[1]?.account_name,
      bank_name: userData?.BankDetails?.[1]?.bank_name,
      account_no: userData?.BankDetails?.[1]?.account_no,
      ifsc_code: userData?.BankDetails?.[1]?.ifsc_code,
    });
  }, [userData]);

  //secondary bank details
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
        BankDetails: {
          ...userData?.BankDetails,
          1: {
            ...userData?.BankDetails?.[1],
            account_name: newBankDetailsInfo?.account_name,
            bank_name: newBankDetailsInfo?.bank_name,
            account_no: newBankDetailsInfo?.account_no,
            ifsc_code: newBankDetailsInfo?.ifsc_code,
          },
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Secondary Bank Details Added Successfully !",
    });
    console.log("sec bank details added successfully");
    handleClose(setSecbankDetails);
  };

  return (
    <>
      {bankDetails ? (
        <>
          <FinancialDetailsModal
            bankDetails={bankDetails}
            setBankDetails={setBankDetails}
            bankDetailsInfo={bankDetailsInfo}
            setBankDetailsInfo={setBankDetailsInfo}
            handleClose={handleClose}
            handleSave={handleSave}
            userData={userData?.BankDetails?.["0"]}
          />
        </>
      ) : (
        <>
          {" "}
          <FinancialDetailsModal
            bankDetails={secbankDetails}
            setBankDetails={setSecbankDetails}
            bankDetailsInfo={newBankDetailsInfo}
            setBankDetailsInfo={setNewBankDetailsInfo}
            handleClose={handleClose}
            handleSave={handleFormSave}
            userData={userData.BankDetails?.["1"]}
          />
        </>
      )}
    </>
  );
};

const FinancialDetailsModal = ({
  bankDetails,
  setBankDetails,
  bankDetailsInfo,
  setBankDetailsInfo,
  handleClose,
  handleSave,
  userData,
}) => {
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={bankDetails}
      onClose={() => handleClose(setBankDetails)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Bank Details</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="bankaccname"
                label="Account Name"
                placeholder="Rohan Gupta"
                fullWidth
                variant="outlined"
                value={bankDetailsInfo?.account_name}
                onChange={(e) => {
                  setBankDetailsInfo({
                    ...bankDetailsInfo,
                    account_name: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="bankname"
                label="Bank Name"
                placeholder="ICICI Bank"
                fullWidth
                variant="outlined"
                value={bankDetailsInfo?.bank_name}
                onChange={(e) => {
                  setBankDetailsInfo({
                    ...bankDetailsInfo,
                    bank_name: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="bankaccnum"
                label="Account Number"
                fullWidth
                variant="outlined"
                value={bankDetailsInfo?.account_no}
                onChange={(e) => {
                  setBankDetailsInfo({
                    ...bankDetailsInfo,
                    account_no: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="ifsccode"
                label="IFSC Code"
                fullWidth
                variant="outlined"
                value={bankDetailsInfo?.ifsc_code}
                onChange={(e) => {
                  setBankDetailsInfo({
                    ...bankDetailsInfo,
                    ifsc_code: e.target.value,
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
            handleClose(setBankDetails);
            setBankDetailsInfo(userData);
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

export default BankDetails;
