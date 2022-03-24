import Header from "../../components/header/Header";
import ProfileIntro from "../../components/profile_Intro/ProfileIntro";
import DashboardStats from "../../components/dashboard_stats/DashboardStats";
import Navigation from "../../components/navigation/Navigation";
import Table from "../../components/table/Table";

import styles from "./Attendance.module.css";
import portalprofile from "../../assets/portalprofile.jpeg";
import Footer from "../../components/footer/Footer";

const attendanceintro = [
  {
    time: "Morning",
    profileName: "Rohan",
    profiledesc: "Here is what your dashboard looks like today.",
    profileimg: portalprofile,
  },
];

const Attendance = () => {
  return (
    <div className={styles.attendance}>
      <Header />
      <ProfileIntro profileintrodata={attendanceintro} />

      {/* stats cards */}
      <DashboardStats />

      {/* navigation */}
      <Navigation />

      <div className={styles.attendance_container}>
        {/* attendance cards */}
        <div className={styles.attendance_cards}>
          <section className={styles.attendance_banner}>
            <h1>Attendance</h1>
            <p>Mark your attendance</p>
          </section>

          <section className={styles.work_banner}>
            <h1>Start Your Day!</h1>
            <p>Punch-in and get started with your work.</p>
          </section>

          <div className={styles.punch_attendance}>
            <section className={styles.login}>
              <p>Log in your attendance</p>
            </section>
            <section className={styles.logout}>
              <p>Log out your attendance</p>
            </section>
          </div>
        </div>

        {/* attendance filter */}
        <div className={styles.attendance_filter}>
          <h1>Filters for Attendance Log</h1>
          <div className={styles.filter_cards}>
            <section className={styles.cardbody}>
              <p>Month</p>
              {/* <Dropdown /> */}
              <select>
                <option>march</option>
              </select>
            </section>
            <section className={styles.cardbody}>
              <p>Overtime</p>
              <select>
                <option>30 mins</option>
              </select>
            </section>
            <section className={styles.cardbody}>
              <p>Prod. Type</p>
              <select>
                <option>Half Day Only</option>
              </select>
            </section>
            <section className={styles.cardbody}>
              <p>Year</p>
              <select>
                <option>2022</option>
              </select>
            </section>
          </div>
        </div>

        {/* attendance table */}
        <div className={styles.attendance_table}>
          <Table />
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Attendance;
