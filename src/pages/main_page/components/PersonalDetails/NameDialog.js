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

const NameDialog = ({
  namedialog,
  setnamedialog,
  handleClose,
  handleClickOpen,
}) => {
  const { user } = useContext(userAuthContext);
  const { userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const [name, setName] = useState({});
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  useEffect(() => {
    setName({
      ...name,
      firstname: userData?.basicinfo?.firstname,
      middlename: userData?.basicinfo?.middlename,
      lastname: userData?.basicinfo?.lastname,
    });
  }, [userData]);

  console.log(userData);

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
          firstname: name?.firstname,
          middlename: name?.middlename,
          lastname: name?.lastname,
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Name Updated Successfully !",
    });
    console.log("name changed successfully");
    handleClose(setnamedialog);
  };

  return (
    <>
      <Dialog
        sx={{ borderRadius: "25" }}
        open={namedialog}
        onClose={() => handleClose(setnamedialog)}
      >
        <form>
          <div className={styles.dialogform}>
            <DialogTitle>
              <h2>Name</h2>
            </DialogTitle>
            <DialogContent>
              <div className={styles.field}>
                <TextField
                  margin="dense"
                  id="name"
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  value={name?.firstname}
                  onChange={(e) => {
                    setName({
                      ...name,
                      firstname: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={styles.field}>
                <TextField
                  margin="dense"
                  id="middle_name"
                  label="Middle Name (optional)"
                  fullWidth
                  variant="outlined"
                  value={name?.middlename}
                  onChange={(e) => {
                    setName({
                      ...name,
                      middlename: e.target.value,
                    });
                  }}
                />
              </div>
              <div className={styles.field}>
                <TextField
                  margin="dense"
                  id="last_name"
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  value={name?.lastname}
                  onChange={(e) => {
                    setName({
                      ...name,
                      lastname: e.target.value,
                    });
                  }}
                />
              </div>
            </DialogContent>
            {/* <FormBtn /> */}
          </div>
        </form>
        <div className={styles.form_btns}>
          <button
            className={styles.cancel}
            onClick={() => {
              handleClose(setnamedialog);
              setName({
                firstname: userData?.basicinfo?.firstname,
                middlename: userData?.basicinfo?.middlename,
                lastname: userData?.basicinfo?.lastname,
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

export default NameDialog;
