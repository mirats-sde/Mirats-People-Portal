import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import {
  collection,
  doc,
  onSnapshot,
  query,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";
import Snackbar from "@mui/material/Snackbar";

const Shift = ({ shift, setShift, handleClose, handleClickOpen }) => {
  const { userData, user, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen } = useContext(userAuthContext);
  const [shiftInfo, setShiftInfo] = useState();
  const [shiftDetails, setShiftDetails] = useState();

  console.log(userData);
  async function getShifts() {
    const q = query(
      collection(firestoredb, "miratsinsights", "peoples", "shift")
    );
    onSnapshot(q, (querySnapshot) => {
      setShiftDetails([]);
      querySnapshot.forEach((doc) => {
        if (userData?.basicinfo?.employeeType === doc.data()?.shifttype) {
          setShiftDetails((prear) => [
            ...prear,
            {
              shift_name: doc.data().shiftname,
              start_time: doc.data().starttime,
              end_time: doc.data().endtime,
            },
          ]);
        }
      });
    });
  }

  useEffect(() => {
    setShiftInfo({
      ...shiftInfo,
      shift: {
        ...shiftInfo?.shift,
        start_time: userData?.WorkDetails?.start_time,
        end_time: userData?.WorkDetails?.end_time,
        shift_name: userData?.WorkDetails?.shift_name,
      },
    });
    getShifts();
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
        WorkDetails: {
          ...userData?.WorkDetails,
          shift: {
            ...userData?.WorkDetails?.shift,
            start_time: shiftInfo?.shift.start_time,
            end_time: shiftInfo?.shift.end_time,
            shift_name: shiftInfo?.shift.shift_name,
          },
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Shift Details Updated Successfully !",
    });
    console.log("shift details changed successfully");
    handleClose(setShift);
  };

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={shift}
      onClose={() => handleClose(setShift)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Shift Details</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <select
                name=""
                id=""
                value={shiftInfo?.shift?.shift_name}
                onChange={(e) => {
                  shiftDetails?.map((data) => {
                    if (e.target.value === data?.shift_name) {
                      setShiftInfo({
                        ...shiftInfo,
                        shift: {
                          ...shiftInfo?.shift,
                          start_time: data?.start_time,
                          end_time: data?.end_time,
                          shift_name: data?.shift_name,
                        },
                      });
                    }
                  });
                }}
              >
                {shiftDetails?.map((data) => {
                  return (
                    <option value={data?.shift_name}>{data?.shift_name}</option>
                  );
                })}
              </select>
            </div>
          </DialogContent>
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => {
            handleClose(setShift);
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

export default Shift;
