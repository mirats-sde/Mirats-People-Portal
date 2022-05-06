import DashboardStats from "../../components/dashboard_stats/DashboardStats";
import Header from "../../components/header/Header";
import Navigation from "../../components/navigation/Navigation";
import ProfileIntro from "../../components/profile_Intro/ProfileIntro";
import LeaveTable from "../../components/leave_table/LeaveTable";
import Footer from "../../components/footer/Footer";
import styles from "./Leave.module.css";
import portalprofile from "../../assets/portalprofile.jpeg";
import LeaveForm from "./LeaveForm";
import { useState } from "react";

const leaveintro = [
  {
    time: "Afternoon",
    profileName: "Rohan",
    profiledesc: "Follow Your Passion.",
    profileimg: portalprofile,
  },
];

const Leave = () => {
  const [leaveForm, setLeaveForm] = useState(false);

  return (
    <div className={styles.leave}>
      <Header />

      <LeaveForm
        openLeaveForm={leaveForm}
        setOpenLeaveForm={setLeaveForm}
        handleCloseLeaveForm={() => setLeaveForm(false)}
        handleLeaveFormOpen={() => setLeaveForm(true)}
        id={null}
      />
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
            <p className={styles.number}>20</p>
          </section>

          <div className={styles.punch_attendance}>
            <section className={styles.login}>
              <p>Casual Leave</p>
              <p>2</p>
            </section>
            <section className={styles.logout}>
              <p>Sick Leave</p>
              <p>2</p>
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
                <select>
                  <option>march</option>
                </select>
              </section>
              <section className={styles.cardbody}>
                <p>Leave Type</p>
                <select>
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                </select>
              </section>
              <section className={styles.cardbody}>
                <p>Status</p>
                <select>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
              </section>
            </div>

            <section className={styles.request_leave_btn}>
              <button onClick={() => setLeaveForm(true)}>Request Leave</button>
            </section>
          </div>
        </div>

        {/* attendance table */}
        <div className={styles.attendance_table}>
          <LeaveTable />
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Leave;
