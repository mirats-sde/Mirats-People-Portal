import styles from "./DashboardStats.module.css";

const dashboardstatsdata = [
  {
    statsHeading: "days",
    statsNumber: "24",
    statsFooter: "worked this month",
  },
  {
    statsHeading: "days",
    statsNumber: "0",
    statsFooter: "absent this month",
  },
  {
    statsHeading: "days",
    statsNumber: "2",
    statsFooter: "taken leave this year",
  },
  {
    statsHeading: "3 feb",
    statsNumber: "22",
    statsFooter: "joining date",
  },
  {
    statsHeading: "3 oct",
    statsNumber: "99",
    statsFooter: "date of birth",
  },
];

const DashboardStats = () => {
  return (
    <div className={styles.dashboard_stats}>
      {dashboardstatsdata.map((data) => (
        <div className={styles.stats_card}>
          <section className={styles.stats_body}>
            <h2>{data.statsHeading}</h2>
            <span>{data.statsNumber}</span>
          </section>
          <section className={styles.monthly_stats}>
            <p>{data.statsFooter}</p>
          </section>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
