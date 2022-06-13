import DashboardStats from "../../components/dashboard_stats/DashboardStats";
import Header from "../../components/header/Header";
import Navigation from "../../components/navigation/Navigation";
import ProfileIntro from "../../components/profile_Intro/ProfileIntro";
import LeaveTable from "../../components/leave_table/LeaveTable";
import Footer from "../../components/footer/Footer";
import styles from "./Leave.module.css";
import portalprofile from "../../assets/default-profile.jpeg";
import LeaveForm from "./LeaveForm";
import { useContext, useEffect, useState } from "react";
import { useLeaveContext } from "./LeaveContext";
import SnackbarMsg from "../../components/Snackbar";
import { userAuthContext } from "../context/Userauthcontext";

//getting nowtime and printing greet message
let Greet = "";
const nowtime = new Date().getHours();
// console.log(nowtime);
if (nowtime >= 5 && nowtime < 12) {
  Greet = "Morning";
} else if (nowtime >= 12 && nowtime <= 16) {
  Greet = "Afternoon";
} else if (nowtime > 16 && nowtime < 23) {
  Greet = "Good Evening";
} else {
  Greet = "Night";
}

const Leave = () => {
  const {
    leaveForm,
    setLeaveForm,
    snackbarData,
    handleCloseSnackbar,
    leaves,
    filters,
    setFilters,
  } = useLeaveContext();

  const { user, userData, profileimage } = useContext(userAuthContext);

  const leaveintro = [
    {
      time: Greet,
      profileName: userData?.basicinfo?.firstname,
      profiledesc: "Follow Your Passion.",
      profileimg: profileimage?.url || portalprofile,
    },
  ];

  const [leavesStats, setLeaveStats] = useState({});

  useEffect(() => {
    console.log("leaves updated");
    let leavesTaken = 0,
      casualLeaveCnt = 0,
      sickLeaveCnt = 0;
    console.log(leaves);
    leaves?.map((leave) => {
      leavesTaken += leave?.status === "Approved" ? leave?.number_of_days : 0;
      if (leave?.leave_type === "casual")
        casualLeaveCnt += leave?.number_of_days;
      else sickLeaveCnt += leave?.number_of_days;
      if (leavesTaken > 24) leavesTaken = 24;
      console.log(leave);
      setLeaveStats({
        remainingLeaves: 24 - leavesTaken,
        casualLeaveCnt,
        sickLeaveCnt,
      });
    });
  }, [leaves]);

  const handleFilterChange = (value, filterFor) => {
    setFilters((prevData) => {
      return {
        ...prevData,
        [filterFor]: value,
      };
    });
  };

  return (
    <>
      <SnackbarMsg
        snackbarData={snackbarData}
        handleClose={handleCloseSnackbar}
      />

      <LeaveForm openLeaveForm={leaveForm} setOpenLeaveForm={setLeaveForm} />
      <div className={styles.leave}>
        <Header />

        <ProfileIntro profileintrodata={leaveintro} />

        {/* stats cards */}
        <DashboardStats />

        {/* navigation */}
        <Navigation />

        <div className={styles.leave_container}>
          {/* attendance cards */}
          <div className={styles.attendance_cards}>
            <section className={styles.attendance_banner}>
              <h1>Total Leaves</h1>
              <p className={styles.number}>24</p>
            </section>

            <section className={styles.work_banner}>
              <h1>Remaining Leaves</h1>
              <p className={styles.number}>
                {leavesStats?.remainingLeaves
                  ? leavesStats?.remainingLeaves
                  : 24}
              </p>
            </section>

            <div className={styles.punch_attendance}>
              <section className={styles.login}>
                <p>Casual Leave</p>
                <p>
                  {leavesStats?.casualLeaveCnt
                    ? leavesStats?.casualLeaveCnt
                    : 0}
                </p>
              </section>
              <section className={styles.logout}>
                <p>Sick Leave</p>
                <p>
                  {leavesStats?.sickLeaveCnt ? leavesStats?.sickLeaveCnt : 0}
                </p>
              </section>
            </div>
          </div>

          {/* attendance filter */}
          <div className={styles.attendance_filter}>
            <div className={styles.filter_cards}>
              <div className={styles.filter_section}>
                <section className={styles.cardbody}>
                  <p>Month</p>
                  {/* <Dropdown /> */}
                  <select
                    value={filters?.month}
                    onChange={(e) => {
                      handleFilterChange(e.target.value, "month");
                    }}
                  >
                    <option selected disabled hidden>
                      month
                    </option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </section>
                <section className={styles.cardbody}>
                  <p>Leave Type</p>
                  <select
                    value={filters?.leave_type}
                    onChange={(e) => {
                      handleFilterChange(e.target.value, "leave_type");
                    }}
                  >
                    <option selected disabled hidden>
                      leave type
                    </option>
                    <option value="casual">Casual Leave</option>
                    <option value="sick">Sick Leave</option>
                  </select>
                </section>
                <section className={styles.cardbody}>
                  <p>Status</p>
                  <select
                    value={filters?.status}
                    onChange={(e) => {
                      handleFilterChange(e.target.value, "status");
                    }}
                  >
                    <option selected disabled hidden>
                      status
                    </option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </section>
              </div>

              <section className={styles.request_leave_btn}>
                <button
                  onClick={() =>
                    setLeaveForm({ open: true, formType: "create", data: "" })
                  }
                >
                  Request Leave
                </button>
              </section>
            </div>
          </div>

          {/* attendance table */}
          <div className={styles.attendance_table}>
            <LeaveTable leaves={leaves} />
          </div>
        </div>

        {/* footer */}
        <Footer />
      </div>
    </>
  );
};

export default Leave;
