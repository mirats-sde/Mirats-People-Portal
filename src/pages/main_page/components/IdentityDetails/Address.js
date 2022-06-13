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

const Address = ({ address, setAddress, handleClose, handleClickOpen }) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  const [addressInfo, setAddressInfo] = useState({});

  useEffect(() => {
    setAddressInfo({
      ...addressInfo,
      street_address: userData?.IdentificationDetails?.address?.street_address,
      city: userData?.IdentificationDetails?.address?.city,
      zip_code: userData?.IdentificationDetails?.address?.zip_code,
      state: userData?.IdentificationDetails?.address?.state,
      country: userData?.IdentificationDetails?.address?.country,
    });
  }, [userData]);

  console.log(addressInfo);

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
          address: {
            ...userData?.IdentificationDetails?.aadhar_card,
            street_address: addressInfo?.street_address,
            city: addressInfo?.city,
            zip_code: addressInfo?.zip_code,
            state: addressInfo?.state,
            country: addressInfo?.country,
          },
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Address Details Updated Successfully !",
    });
    console.log("address details changed successfully");
    handleClose(setAddress);
  };

  console.log(addressInfo);

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={address}
      onClose={() => handleClose(setAddress)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Address</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="streetaddress"
                label="Street Address"
                placeholder="C-23, Block C,
                Sector 7"
                fullWidth
                variant="outlined"
                value={addressInfo?.street_address}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    street_address: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="city"
                label="City"
                placeholder="Dwarka"
                variant="outlined"
                className={styles.city}
                value={addressInfo?.city}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    city: e.target.value,
                  });
                }}
              />
              <TextField
                margin="dense"
                id="zipcode"
                label="Zip Code"
                placeholder="110000"
                variant="outlined"
                className={styles.zipcode}
                value={addressInfo?.zip_code}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    zip_code: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="state"
                label="State"
                placeholder="New Delhi"
                variant="outlined"
                className={styles.state}
                value={addressInfo?.state}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    state: e.target.value,
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
                value={addressInfo?.country}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
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
            handleClose(setAddress);
            setAddressInfo({
              ...addressInfo,
              street_address:
                userData?.IdentificationDetails?.address?.street_address,
              city: userData?.IdentificationDetails?.address?.city,
              zip_code: userData?.IdentificationDetails?.address?.zip_code,
              state: userData?.IdentificationDetails?.address?.state,
              country: userData?.IdentificationDetails?.address?.country,
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

export default Address;
