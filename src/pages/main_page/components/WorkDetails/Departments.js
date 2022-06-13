import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { firestoredb } from "../../../../firebase-config";
import { createSpacing } from "@mui/system";

const Department = ({ dept, setDept, handleClose, handleClickOpen }) => {
  const { user, userData, setUserData, handleFormSubmit } =
    useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);
  const [department, setDepartment] = useState();

  //getting department data in usestate:
  const [departmentInfo, setDepartmentInfo] = useState([]);
  async function getDepartments() {
    onSnapshot(
      doc(
        firestoredb,
        "miratsinsights",
        "peoples",
        "departments",
        "All_Departments"
      ),
      (doc) => {
        setDepartmentInfo([]);
        const data = doc.data().departments;
        Object.entries(data).forEach(([key, value]) =>
          setDepartmentInfo((prear) => [...prear, key])
        );
      }
    );
  }

  // console.log(departmentInfo);

  useEffect(() => {
    setDepartment({
      ...department,
      department: userData?.WorkDetails?.department,
    });
    getDepartments();
  }, [userData]);

  //saving department of user:
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
          department: department?.department,
        },
      },
      { merge: true }
    );
    setOpen({
      open: true,
      severity: "success",
      msg: "Department Details Updated Successfully !",
    });
    console.log("department data changed successfully");
    handleClose(setDept);
  };

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={dept}
      onClose={() => handleClose(setDept)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Department</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <select
                name=""
                id=""
                value={department?.department}
                onChange={(e) => {
                  setDepartment({
                    ...department,
                    department: e.target.value,
                  });
                }}
              >
                {departmentInfo?.map((data) => {
                  return <option value={data}>{data}</option>;
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
            handleClose(setDept);
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

export default Department;
