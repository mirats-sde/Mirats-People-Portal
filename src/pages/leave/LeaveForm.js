import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styles from "./Leave.module.css";
import { useLeaveContext } from "./LeaveContext";
import { Timestamp } from "@firebase/firestore";

const LeaveForm = ({ openLeaveForm, setOpenLeaveForm }) => {
  const {
    leaveData,
    setLeaveData,
    handleInputData,
    handleApplyLeaveBtn,
    handleUpdateLeaveBtn,
  } = useLeaveContext();

  useEffect(() => {
    setLeaveData(openLeaveForm?.data);
  }, [openLeaveForm]);

  console.log(leaveData);
  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={openLeaveForm?.open}
      onClose={() =>
        setOpenLeaveForm({ open: false, formType: openLeaveForm?.formType })
      }
    >
      <form onSubmit={handleApplyLeaveBtn}>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2>Request Leave</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <InputLabel id="demo-simple-select-label">Leave Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={leaveData?.leave_type}
                label="Leave Type"
                onChange={(e) => handleInputData(e.target.value, "leave_type")}
                fullWidth
                required
              >
                <MenuItem value="casual">Casual Leave</MenuItem>
                <MenuItem value="sick">Sick Leave</MenuItem>
              </Select>
            </div>

            <div className={styles.field}>
              <InputLabel>Leave From</InputLabel>
              <TextField
                margin="dense"
                id="name"
                type="date"
                fullWidth
                variant="outlined"
                value={leaveData?.from_date
                  ?.toDate()
                  ?.toLocaleDateString("en-CA")}
                onChange={(e) =>
                  handleInputData(
                    Timestamp.fromDate(new Date(e.target.value)),
                    "from_date"
                  )
                }
                required
              />
            </div>

            <div className={styles.field}>
              <InputLabel>Leave To</InputLabel>
              <TextField
                margin="dense"
                id="name"
                type="date"
                fullWidth
                variant="outlined"
                value={leaveData?.to_date
                  ?.toDate()
                  ?.toLocaleDateString("en-CA")}
                onChange={(e) =>
                  handleInputData(
                    Timestamp.fromDate(new Date(e.target.value)),
                    "to_date"
                  )
                }
                required
              />
            </div>

            <div className={styles.field}>
              <InputLabel>Reason</InputLabel>
              <TextField
                margin="dense"
                id="name"
                multiline
                fullWidth
                variant="outlined"
                value={leaveData?.reason}
                onChange={(e) => handleInputData(e.target.value, "reason")}
                required
              />
            </div>
          </DialogContent>
        </div>
        <div className={styles.form_btns}>
          <button
            className={styles.cancel}
            onClick={() => {
              setOpenLeaveForm(false);
            }}
            type="button"
          >
            Cancel
          </button>
          {openLeaveForm?.formType === "create" ? (
            <button
              type="submit"
              className={styles.save}
              // onClick={handleApplyLeaveBtn}
            >
              Apply Leave
            </button>
          ) : (
            <button
              type="submit"
              className={styles.save}
              onClick={(e) => handleUpdateLeaveBtn(e, leaveData?.id)}
            >
              Update Leave
            </button>
          )}
        </div>
      </form>
    </Dialog>
  );
};

export default LeaveForm;
