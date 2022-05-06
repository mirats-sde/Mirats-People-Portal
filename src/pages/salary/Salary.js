import styles from "./Salary.module.css";
import portalprofile from "../../assets/portalprofile.jpeg";
import Header from "../../components/header/Header";
import ProfileIntro from "../../components/profile_Intro/ProfileIntro";
import DashboardStats from "../../components/dashboard_stats/DashboardStats";
import Navigation from "../../components/navigation/Navigation";

const salaryintro = [
  {
    time: "Afternoon",
    profileName: "Rohan",
    profiledesc: "Here is what your dashboard looks like today.",
    profileimg: portalprofile,
  },
];

const Salary = () => {
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
