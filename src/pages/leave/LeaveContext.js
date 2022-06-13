import { addDoc, collection } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firestoredb } from "../../firebase-config";
import {
  addLeave,
  getAllLeaves,
  updateLeave,
} from "../../utils/firebaseQueries";
import { userAuthContext } from "../context/Userauthcontext";

const LeaveContext = createContext();

export const useLeaveContext = () => {
  return useContext(LeaveContext);
};

const LeaveContextProvider = ({ children }) => {
  const [leaveData, setLeaveData] = useState([]);
  const [leaveForm, setLeaveForm] = useState({});
  const [snackbarData, setSnackbarData] = useState({});
  const [leaves, setLeaves] = useState([]);
  const [leavesCopy, setLeavesCopy] = useState([]);
  const { user } = useContext(userAuthContext);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    user &&
      getAllLeaves(user?.uid)
        .then((leaves) => {
          let leavesTmp = [];
          leaves.forEach((leave) => {
            leavesTmp.push({ ...leave.data(), id: leave?.id });
          });
          setLeaves(leavesTmp);
          setLeavesCopy(leavesTmp);
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, [user]);

  const handleCloseSnackbar = () => {
    setSnackbarData(false);
  };

  const handleInputData = (value, inputFor) => {
    setLeaveData((prevData) => {
      return {
        ...prevData,
        [inputFor]: value,
      };
    });
  };

  const handleApplyLeaveBtn = async (e) => {
    e.preventDefault();
    setLeaveForm({ open: false });
    let cntNumberOfDays = getNumberOfDays(0);
    console.log(leaveData);
    try {
      await addLeave(leaveData, user?.uid, cntNumberOfDays);
      let leavesTmp = leaves;
      leavesTmp.unshift({
        ...leaveData,
        status: "Pending",
        apply_date: new Date(),
        number_of_days: cntNumberOfDays,
      });
      setLeaves(leavesTmp);
      setSnackbarData({ open: true, msg: "Leave Added", severity: "success" });
      console.log("leave added");
    } catch (error) {
      setSnackbarData({
        open: true,
        msg: "Oops something went wrong",
        severity: "error",
      });
      console.log(error.message);
    }
  };

  const handleUpdateLeaveBtn = async (e, id) => {
    e.preventDefault();
    setLeaveForm({ open: false });
    let cntNumberOfDays = getNumberOfDays(0);
    try {
      await updateLeave(leaveData, user?.uid, cntNumberOfDays);
      let leavesTmp = leaves;
      leaveData["id"] = id;
      leaveData.number_of_days = cntNumberOfDays;
      setLeaves(
        leavesTmp.map((ltmp) => {
          console.log(ltmp?.id === leaveData?.id);
          if (ltmp?.id === id) {
            return leaveData;
          } else return ltmp;
        })
      );
      setSnackbarData({
        open: true,
        msg: "Leave Upadated",
        severity: "success",
      });
      console.log("leave updated");
    } catch (err) {
      setSnackbarData({
        open: true,
        msg: "Oops something went wrong",
        severity: "error",
      });
      console.log(err);
    }
  };

  const getNumberOfDays = (cntNumberOfDays) => {
    let start = leaveData?.from_date.toDate();
    let end = leaveData?.to_date.toDate();
    let loop = new Date(start);
    while (loop <= end) {
      console.log("in condition");
      if (loop.toLocaleDateString("en-US", { weekday: "short" }) !== "Sun") {
        cntNumberOfDays++;
      }
      let newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }
    return cntNumberOfDays;
  };

  useEffect(() => {
    setLeaves(leavesCopy);
    Object.keys(filters)?.map((filterFor) => {
      switch (filterFor) {
        case "month":
          return setLeaves((prevData) => {
            return prevData.filter((data) => {
              if (
                filters?.month ===
                  new Date(data?.from_date)?.toLocaleDateString("en-CA", {
                    month: "long",
                  }) ||
                filters?.month ===
                  new Date(data?.to_date)?.toLocaleDateString("en-CA", {
                    month: "long",
                  })
              )
                return data;
            });
          });
        case "leave_type":
          return setLeaves((prevData) => {
            return prevData.filter((data) => {
              return filters?.leave_type === data?.leave_type;
            });
          });
        case "status":
          return setLeaves((prevData) => {
            return prevData.filter((data) => {
              return filters?.status === data?.status;
            });
          });
        default:
          return;
      }
    });
  }, [filters]);

  console.log(leaveData);

  const value = {
    leaveData,
    setLeaveData,
    handleInputData,
    handleApplyLeaveBtn,
    leaveForm,
    setLeaveForm,
    snackbarData,
    handleCloseSnackbar,
    handleUpdateLeaveBtn,
    leaves,
    filters,
    setFilters,
  };
  return (
    <LeaveContext.Provider value={value}>{children}</LeaveContext.Provider>
  );
};

export default LeaveContextProvider;
