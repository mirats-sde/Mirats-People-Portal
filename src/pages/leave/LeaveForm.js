import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styles from "./Leave.module.css";

const LeaveForm = ({
  openLeaveForm,
  setOpenLeaveForm,
  handleCloseLeaveForm,
  handleLeaveFormOpen,
  id,
}) => {
  //   const [age, setAge] = useState("");

  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={openLeaveForm}
      onClose={() => handleCloseLeaveForm(setOpenLeaveForm)}
    >
      <form>
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
                // value={age}
                label="Leave Type"
                // onChange={handleChange}
                fullWidth
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
              />
            </div>
          </DialogContent>
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => handleCloseLeaveForm(setOpenLeaveForm)}
        >
          Cancel
        </button>
        <button className={styles.save}>Apply Leave</button>
      </div>
    </Dialog>
  );
};

export default LeaveForm;
