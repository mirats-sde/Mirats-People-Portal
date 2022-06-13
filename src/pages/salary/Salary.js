import styles from "./Salary.module.css";
import portalprofile from "../../assets/default-profile.jpeg";
import Header from "../../components/header/Header";
import ProfileIntro from "../../components/profile_Intro/ProfileIntro";
import DashboardStats from "../../components/dashboard_stats/DashboardStats";
import Navigation from "../../components/navigation/Navigation";
import { useContext } from "react";
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

const Salary = () => {
  const { userData, user, profileimage } = useContext(userAuthContext);

  const salaryintro = [
    {
      time: Greet,
      profileName: userData?.basicinfo?.firstname,
      profiledesc: "Here is what your dashboard looks like today.",
      profileimg: profileimage?.url || portalprofile,
    },
  ];
  return (
    <div className={styles.salary}>
      <Header />
      <ProfileIntro profileintrodata={salaryintro} />

      {/* stats cards */}
      <DashboardStats />

      {/* navigation */}
      <Navigation />

      {/* salary filter */}
      <div className={styles.salary_container}>
        {/* filter */}
        <div className={styles.attendance_filter}>
          <section className={styles.cardbody}>
            <p>Last Month</p>
            {/* <Dropdown /> */}
            <select>
              <option>march</option>
            </select>
          </section>
        </div>

        {/* cards */}
        <div className={styles.salaryDetails_container}>
          <div className={styles.salary_details}>
            <section className={styles.details_wrapper}>
              <h1>February, 2022</h1>
              <p>INR 22,000</p>
              <p>Fixed Component - XX,XXX</p>
              <p>Variable Pay - XX,XXX</p>
            </section>
            <a className={styles.view_salary} href="viewsalary">
              View Salary Slip
            </a>
          </div>

          <div className={styles.salary_details}>
            <section className={styles.details_wrapper}>
              <h1>March, 2022</h1>
              <p>INR 22,000</p>
              <p>Fixed Component - XX,XXX</p>
              <p>Variable Pay - XX,XXX</p>
            </section>
            <a className={styles.view_salary} href="viewsalary">
              View Salary Slip
            </a>
          </div>

          <div className={styles.salary_details}>
            <section className={styles.details_wrapper}>
              <h1>April, 2022</h1>
              <p>INR 22,000</p>
              <p>Fixed Component - XX,XXX</p>
              <p>Variable Pay - XX,XXX</p>
            </section>
            <a className={styles.view_salary} href="viewsalary">
              View Salary Slip
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
